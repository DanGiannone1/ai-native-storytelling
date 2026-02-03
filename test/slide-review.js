/**
 * Slide review tool for visual QA
 * Usage: node test/slide-review.js [path-to-html] [--out name] [--wait ms] [--viewport WxH]
 *
 * Example:
 *   node test/slide-review.js decks/ai-foundations.html --out ai-foundations-review
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const DEFAULT_VIEWPORT = { width: 1920, height: 1080 };
const DEFAULT_WAIT = 3500;

function parseArgs(argv) {
  const options = {
    out: 'review',
    wait: DEFAULT_WAIT,
    width: DEFAULT_VIEWPORT.width,
    height: DEFAULT_VIEWPORT.height,
    executable: null,
  };
  const positionals = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
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
    if (arg === '--executable') {
      options.executable = argv[++i];
      continue;
    }
    positionals.push(arg);
  }

  return { options, positionals };
}

function resolveFileUrl(inputPath, slideNumber) {
  const [pathPart] = inputPath.split('#');
  const hash = slideNumber ? String(slideNumber) : '';

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

async function getSlideIndex(page) {
  return page.evaluate(() => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const idx = slides.findIndex(el => el.classList.contains('active'));
    return idx + 1;
  });
}

async function getSlideCount(page) {
  return page.evaluate(() => {
    const slides = document.querySelectorAll('.slide');
    return slides.length;
  });
}

async function reviewSlides(htmlPath = 'index.html', options = {}) {
  ensureScreenshotDir();

  const launchOptions = {};
  if (options.executable) {
    launchOptions.executablePath = options.executable;
  }

  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({
    viewport: { width: options.width, height: options.height }
  });
  const page = await context.newPage();

  const errors = new Set();
  page.on('console', msg => {
    if (msg.type() === 'error') errors.add(msg.text());
  });
  page.on('pageerror', err => errors.add(err.message));

  const startUrl = resolveFileUrl(htmlPath, 1);
  console.log(`Loading: ${startUrl}`);
  await page.goto(startUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(options.wait);

  const slideCount = await getSlideCount(page);
  console.log(`Found ${slideCount} slides`);

  for (let i = 1; i <= slideCount; i++) {
    const expected = i;
    const current = await getSlideIndex(page);

    if (current < expected) {
      for (let step = current; step < expected; step++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForFunction(
          (target) => {
            const slides = Array.from(document.querySelectorAll('.slide'));
            const idx = slides.findIndex(el => el.classList.contains('active'));
            return idx + 1 === target;
          },
          expected,
          { timeout: 5000 }
        );
      }
    } else if (current > expected) {
      for (let step = current; step > expected; step--) {
        await page.keyboard.press('ArrowLeft');
        await page.waitForFunction(
          (target) => {
            const slides = Array.from(document.querySelectorAll('.slide'));
            const idx = slides.findIndex(el => el.classList.contains('active'));
            return idx + 1 === target;
          },
          expected,
          { timeout: 5000 }
        );
      }
    }

    await page.waitForTimeout(options.wait);
    const outputPath = path.join(SCREENSHOT_DIR, `${options.out}-${i}.png`);
    await page.screenshot({ path: outputPath });
    console.log(`Captured slide ${i}: ${outputPath}`);
  }

  if (errors.size > 0) {
    console.log('\n--- Console Errors ---');
    [...errors].forEach(e => console.log(`  ${e}`));
    console.log('----------------------\n');
  } else {
    console.log('No console errors detected');
  }

  await browser.close();
}

const { options, positionals } = parseArgs(process.argv.slice(2));
const htmlPath = positionals[0] || 'index.html';
reviewSlides(htmlPath, options);
