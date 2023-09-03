// npm install puppeteer
import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    // Launch in headless mode
    headless: 'new',
  });
  // Open a new blank page
  const page = await browser.newPage();
  // Navigate the page to target URL
  await page.goto('https://httpbin.org/ip');
  // Get body element
  const bodySelector = await page.waitForSelector('body');
  // Get the content of body element
  const textContent = await bodySelector?.evaluate((el) => el.textContent);
  // Print the content
  console.log(textContent);
  // Close browser
  await browser.close();
})();