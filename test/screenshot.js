/**
 * Quick screenshot tool for visual testing
 * Usage: node test/screenshot.js [path-to-html] [output-name]
 * Examples:
 *   node test/screenshot.js decks/ai-foundations.html --slide 3 --out slide-3
 *   node test/screenshot.js decks/ai-foundations.html --all --out ai-foundations
 *
 * Options:
 *   --all                Capture all slides in the deck
 *   --slide <n>          Capture a specific 1-based slide number
 *   --out <name>         Output name (no extension needed)
 *   --wait <ms>          Delay before capture (default: 3500)
 *   --viewport <WxH>     Viewport size (default: 1920x1080)
 *   --full-page          Capture full page instead of viewport
 *   --executable <path>  Custom Chrome/Edge executable path
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const DEFAULT_VIEWPORT = { width: 1920, height: 1080 };
const DEFAULT_WAIT = 3500;

function parseArgs(argv) {
  const options = {
    all: false,
    slide: null,
    out: null,
    wait: DEFAULT_WAIT,
    fullPage: false,
    executable: null,
    width: DEFAULT_VIEWPORT.width,
    height: DEFAULT_VIEWPORT.height,
  };
  const positionals = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--all') {
      options.all = true;
      continue;
    }
    if (arg === '--slide') {
      options.slide = Number.parseInt(argv[++i], 10);
      continue;
    }
    if (arg === '--out') {
      options.out = argv[++i];
      continue;
    }
    if (arg === '--wait') {
      options.wait = Number.parseInt(argv[++i], 10);
      continue;
    }
    if (arg === '--viewport') {
      const [w, h] = (argv[++i] || '').split('x').map(v => Number.parseInt(v, 10));
      if (!Number.isNaN(w) && !Number.isNaN(h)) {
        options.width = w;
        options.height = h;
      }
      continue;
    }
    if (arg === '--full-page') {
      options.fullPage = true;
      continue;
    }
    if (arg === '--executable') {
      options.executable = argv[++i];
      continue;
    }
    positionals.push(arg);
  }

  return { options, positionals };
}

function resolveFileUrl(inputPath, slideNumber) {
  const [pathPart, hashPart] = inputPath.split('#');
  const hash = slideNumber ? String(slideNumber) : hashPart;

  if (/^(https?|file):\/\//i.test(pathPart)) {
    return hash ? `${pathPart.replace(/#.*$/, '')}#${hash}` : pathPart;
  }

  const filePath = path.resolve(__dirname, '..', pathPart);
  return `file://${filePath.replace(/\\/g, '/')}${hash ? '#' + hash : ''}`;
}

function ensureScreenshotDir() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
}

function outputPathForSingle(name) {
  if (!name) return path.join(SCREENSHOT_DIR, 'current.png');
  const parsed = path.parse(name);
  const filename = parsed.ext ? name : `${name}.png`;
  return path.join(SCREENSHOT_DIR, filename);
}

function outputBaseForAll(name) {
  if (!name) return 'slide';
  return path.parse(name).name || 'slide';
}

async function getSlideCount(page) {
  return page.evaluate(() => {
    const dataSlides = document.querySelectorAll('[data-slide]');
    if (dataSlides.length > 0) return dataSlides.length;
    const classSlides = document.querySelectorAll('.slide');
    return classSlides.length;
  });
}

async function takeScreenshot(htmlPath = 'index.html', options = {}) {
  const screenshotBase = outputBaseForAll(options.out);
  const singleOutputPath = outputPathForSingle(options.out);

  // Ensure screenshot directory exists
  ensureScreenshotDir();

  if (!options.all && fs.existsSync(singleOutputPath)) {
    fs.unlinkSync(singleOutputPath);
    console.log('Deleted previous screenshot');
  }

  const launchOptions = {};
  if (options.executable) {
    launchOptions.executablePath = options.executable;
  }
  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({
    viewport: { width: options.width, height: options.height }
  });
  const page = await context.newPage();

  // Collect console errors
  const errors = new Set();
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.add(msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.add(err.message);
  });

  try {
    if (options.all) {
      const firstUrl = resolveFileUrl(htmlPath, 1);
      console.log(`Loading: ${firstUrl}`);
      await page.goto(firstUrl, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(options.wait);

      const slideCount = await getSlideCount(page);
      console.log(`Found ${slideCount} slides`);

      for (let i = 1; i <= slideCount; i++) {
        const slideUrl = resolveFileUrl(htmlPath, i);
        console.log(`Capturing slide ${i}: ${slideUrl}`);
        await page.goto(slideUrl, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(options.wait);
        const outputPath = path.join(SCREENSHOT_DIR, `${screenshotBase}-${i}.png`);
        await page.screenshot({ path: outputPath, fullPage: options.fullPage });
      }
      console.log(`Screenshots saved in: ${SCREENSHOT_DIR}`);
    } else {
      const slideOverride = Number.isFinite(options.slide) ? options.slide : null;
      const fileUrl = resolveFileUrl(htmlPath, slideOverride);
      console.log(`Loading: ${fileUrl}`);

      await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 30000 });

      // Wait for animations/React to render (GSAP animations need more time)
      await page.waitForTimeout(options.wait);

      // Take screenshot
      await page.screenshot({ path: singleOutputPath, fullPage: options.fullPage });
      console.log(`Screenshot saved: ${singleOutputPath}`);

      // Get page content info
      const bodyContent = await page.evaluate(() => {
        const root = document.getElementById('root');
        return {
          rootExists: !!root,
          rootChildren: root ? root.children.length : 0,
          rootHTML: root ? root.innerHTML.substring(0, 200) : 'No root element'
        };
      });
      console.log('Page state:', bodyContent);
    }
  } catch (err) {
    console.error('Error loading page:', err.message);
  }

  // Report errors
  if (errors.size > 0) {
    console.log('\n--- Console Errors ---');
    [...errors].forEach(e => console.log(`  ${e}`));
    console.log('----------------------\n');
  } else {
    console.log('No console errors detected');
  }

  await browser.close();
}

// Run with command line args
const { options, positionals } = parseArgs(process.argv.slice(2));
const htmlPath = positionals[0] || 'index.html';
if (!options.out && positionals[1]) {
  options.out = positionals[1];
}
takeScreenshot(htmlPath, options);
