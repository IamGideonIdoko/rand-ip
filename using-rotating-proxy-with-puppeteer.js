// npm install puppeteer
import puppeteer from 'puppeteer';

const getRandomProxy = () => {
  /**
   * Find free proxies here:
   *   -  https://geonode.com/free-proxy-list
   *   -  https://free-proxy-list.net/
   *   -  https://proxyscrape.com/free-proxy-list-t3
   *   -  https://www.freeproxylists.net/
   */
  const proxies = [
      'http://50.174.7.156:80',
      'http://201.182.251.142:999',
      // ...
      'http://200.123.15.250:999'
  ];
  // Return random proxy
  return proxies[Math.floor(Math.random() * proxies.length)];
}

(async () => {
  const randomProxy = getRandomProxy();
  // Launch the browser
  const browser = await puppeteer.launch({
    // Launch in headless mode
    headless: 'new',
    args: [`--proxy-server=${randomProxy}`],
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