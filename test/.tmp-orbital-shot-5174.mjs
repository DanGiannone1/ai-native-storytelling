import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const url = 'http://localhost:5174/?deck=ai-foundations';
const outDir = path.join('test', 'screenshots');
const outPath = path.join(outDir, 'ai-foundations-orbital-after-1.png');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const slideCount = 20;
const waitMs = 4000;

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await context.newPage();

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await page.keyboard.press('Home');
await page.waitForTimeout(waitMs);

for (let i = 1; i < slideCount; i++) {
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(900);
}

await page.waitForTimeout(waitMs);
await page.screenshot({ path: outPath });

await browser.close();
console.log(`Saved ${outPath}`);
