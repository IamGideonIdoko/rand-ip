// npm install scrapingbee
import scrapingbee from 'scrapingbee';

(async () => {
  try {
    const client = new scrapingbee.ScrapingBeeClient('<YOUR_SCRAPINGBEE_API_KEY>');
    const response = await client.get({
      url: 'https://httpbin.org/ip',
    })
    const decoder = new TextDecoder();
    const textContent = decoder.decode(response.data);
    console.log(textContent);
  } catch (error) {
    console.log('Error: ', error);
  }
})();
