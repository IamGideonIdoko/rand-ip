// npm install puppeteer
import puppeteer from 'puppeteer';
// npm install tor-request
import tr from 'tor-request';
// // npm install puppeteer-page-proxy
// import useProxy from 'puppeteer-page-proxy';

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
  // To hold browser instance
  let browser;
  try {
    // Create new tor session (To get a new IP)
    await renewTorSession();
    // Use Tor as a SOCKS5 proxy (It opens one by default on port 9050)
    // Launch the browser
    browser = await puppeteer.launch({
      // Launch in headless mode
      headless: 'new',
      args: ['--proxy-server=socks5://127.0.0.1:9050'],
    });

    // Open a new blank page
    const page = await browser.newPage();


    // // Specify a per-page proxy
    // await useProxy(page, 'socks5://127.0.0.1:9050'); // Somehow works for only HTTP requests and not HTTPS

    // // Specify a per-request proxy
    // await page.setRequestInterception(true);
    // page.on('request', async request => {
    //     await useProxy(request, 'socks5://127.0.0.1:9050'); // Somehow works for only HTTP requests and not HTTPS
    // });


    // Navigate the page to target URL
    await page.goto('https://httpbin.org/ip');
    // Get body element
    const bodySelector = await page.waitForSelector('body');
    // Get the content of body element
    const textContent = await bodySelector?.evaluate((el) => el.textContent);
    // Print the content
    console.log(textContent);
  } catch (err) {
    console.log('Error: ', err);
  } finally {
    // Close browser
    await browser?.close();
  }
})();