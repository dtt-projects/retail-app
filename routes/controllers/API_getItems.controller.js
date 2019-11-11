/**
 * @module routes/controllers/API_getItems
 * @fileoverview API_getItems route's controller. Handle all business logic
 * relative to API_getItems for the users.
 * @exports {Object} Functions to attach to the `API_getItems` router.
 * @require read-hidden
 * @require cookie-helper
 */

 /* hidden
  * This is to read the hidden credentials file
  */
 var hidden = require('../../scripts/read-hidden.js');

 /* cookies
  * This is to help with handle cookies for user validation
  */
 const cookies = require('../../scripts/cookie-helper.js');


/**
 * @function getItems
 * @description Get the items from the IBM DB for the client
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const getItems = (req, res, next) => {
  //  read creds from the secret file
  hidden.readHidden()
    .then(json => {

      // required for db connection and api call
      var request = require("request");

      // setup the call for the api
      var options = {
        method: 'GET',
        url: 'https://api.us-south.apiconnect.appdomain.cloud/lasermusibmcom-dev/sb/capstone-1.0/Inventory',
        headers:
          { accept: 'application/json',
            'x-ibm-client-secret': json[2]["ClientSecret"],
            'x-ibm-client-id': json[2]["ClientId"] }
      };

      // make the request and on failure log the error and send back 400
      // on success send back the data
      request(options, function (error, response, body) {
        if (error) {
          console.error("Failed getItems:" + error.message);
          res.status(400);
          res.send();
        } else {
          data = JSON.parse(body.toString())
          res.send(data["data"]["inventoryList"]);
        }
      });
    });
};

// so other files can call this function
module.exports = {
  getItems,
};
