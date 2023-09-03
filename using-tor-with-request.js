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

const ipRequest = () => new Promise((resolve, reject) => {
  /**
   * This is a light wrapper function around the NodeJS `request` library, just that, it 
   * routes all requests through your Tor client.
   *
   * Same usage as in the docs: https://github.com/request/request
   */
  tr.request('https://httpbin.org/ip', function (err, res, body) {
    if (!err && res.statusCode == 200) return resolve(body);
    reject(err);
  });
});

(async () => {
  try {
    // Create new tor session (To get a new IP)
    await renewTorSession();
    // Get IP
    const response = await ipRequest();
    console.log(response);
  } catch (err) {
    console.log('Error: ', err);
  }
})();