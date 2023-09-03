// npm install puppeteer
import puppeteer from 'puppeteer';
// npm install tor-request
import tr from 'tor-request';

const renewTorSession = () => {
  return new Promise((resolve, reject) => {
    // Set the default ControlPort
    tr.TorControlPort.port = 9051;
    // Set the password for authenticating with tor
    tr.TorControlPort.password = 'rand-ip';
      /**
       * Request and verify tor for a new session (get a new ip to use).
       *
       * The callback function is called when the process is done
       * The err argument of the callback is null if tor session renewed successfully
       */
    tr.newTorSession((err) => {
      // Log error if session failed to be renewed
      if (err) return reject(err);
      // Session renewed
      console.log('New session renewed');
      resolve();
    });
  });
}

(async () => {
  try {
    // Create new tor session (To get a new IP)
    await renewTorSession();
    // Launch the browser
    const browser = await puppeteer.launch({
      // Launch in headless mode
      headless: 'new',
      // Use Tor as a SOCKS5 proxy (It opens one by default on port 9050)
      args: ['--proxy-server=socks5://127.0.0.1:9050'],
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
  } catch (err) {
    console.log('Error: ', err);
  }
})();