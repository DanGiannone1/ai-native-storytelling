/**
 * Screenshot tool for DeckPlayer presentations
 * Navigates through slides using keyboard navigation
 */

import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const DEFAULT_VIEWPORT = { width: 1920, height: 1080 };

function ensureScreenshotDir() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
}

async function takeScreenshots(url, baseName, slideCount, waitMs = 3000) {
  ensureScreenshotDir();

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: DEFAULT_VIEWPORT
  });
  const page = await context.newPage();

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
    console.log(`Loading: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Press Home to ensure we're at slide 1
    await page.keyboard.press('Home');
    await page.waitForTimeout(waitMs);

    for (let i = 1; i <= slideCount; i++) {
      const outputPath = path.join(SCREENSHOT_DIR, `${baseName}-${i}.png`);
      console.log(`Capturing slide ${i}...`);
      await page.screenshot({ path: outputPath });
      console.log(`  Saved: ${outputPath}`);

      if (i < slideCount) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(waitMs);
      }
    }

    console.log(`\nAll ${slideCount} screenshots saved to: ${SCREENSHOT_DIR}`);
  } catch (err) {
    console.error('Error:', err.message);
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

// Parse args
const args = process.argv.slice(2);
const url = args[0] || 'http://localhost:5173/command-center-architecture';
const baseName = args[1] || 'slide';
const slideCount = parseInt(args[2], 10) || 9;
const waitMs = parseInt(args[3], 10) || 3000;

takeScreenshots(url, baseName, slideCount, waitMs);
