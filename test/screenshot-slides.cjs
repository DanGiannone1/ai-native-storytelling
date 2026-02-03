const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureSlides() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Output to temp scratchpad directory
  const outputDir = 'C:\\Users\\djgia\\AppData\\Local\\Temp\\claude\\C--projects-presentations\\f47a5eeb-e829-4b1e-9c65-a1936ecbc0bd\\scratchpad';
  const baseUrl = 'http://localhost:3501';

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Navigate to presentation list
  await page.goto(baseUrl);
  await page.waitForTimeout(1000);

  // Click on the "Agent Command Center" presentation
  await page.click('text=Agent Command Center');
  await page.waitForTimeout(2000); // Wait for presentation to load

  const totalSlides = 9;

  for (let i = 1; i <= totalSlides; i++) {
    console.log(`Capturing slide ${i}...`);

    // Wait for animations to complete
    await page.waitForTimeout(1500);

    // Take screenshot
    await page.screenshot({
      path: path.join(outputDir, `slide-${String(i).padStart(2, '0')}.png`),
      fullPage: false
    });

    // Go to next slide (if not the last one)
    if (i < totalSlides) {
      await page.keyboard.press('ArrowRight');
    }
  }

  await browser.close();
  console.log('Done! Screenshots saved to:', outputDir);
}

captureSlides().catch(console.error);
