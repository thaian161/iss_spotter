/*==============================================================================
 Makes a single API request to retrieve the user's IP address.
   Input:
    - A callback (to pass back an error or the IP string)
  
  Returns (via Callback):
    - An error, if any (nullable)
    - The IP address as a string (null if error). Example: "162.245.144.188"
 ============================================================================*/
const request = require('request');
const ipAPI = 'https://api.ipify.org?format=json';

const fetchMyIP = function (callback) {
  request(ipAPI, (error, response, body) => {
    // Handle request errors and print the error details to the screen. incase the URL broke
    // if (error) {
    //   callback(error, null);
    //   return;
    // }
    if (error) return callback(error, null);

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      callback(
        Error(`Status Code ${response.statusCode} when fetching IP: ${body}`),
        null
      );
      return;
    }

    //console.log('body:', body);
    //console.log(typeof body); // string

    //Since it is a string => hard to read and work on, use parse and print body to the console as an object
    const ip = JSON.parse(body).ip;
    //console.log(typeof ip); //string
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };
