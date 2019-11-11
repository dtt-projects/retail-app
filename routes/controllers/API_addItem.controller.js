/**
 * @module routes/controllers/API_addItem
 * @fileoverview API_addItem route's controller. Handle all business logic
 * relative to API_addItem for the users.
 * @exports {Object} Functions to attach to the `API_addItem` router.
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
 * @function addItem
 * @description Add an item into the IBM DB based on client form
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const addItem = (req, res, next) => {
  //  read creds from the secret file
  hidden.readHidden()
    .then(json => {

      // required package for request data from DB
      var request = require("request");

      // build the data that will be sent
      var data = {
        "merchantId" : req.body["merchantId"],
        "name" : req.body["name"],
        "cat": req.body["cat"],
        "desc": req.body["desc"],
        "imageLink": req.body["imageLink"],
        "price": req.body["price"],
        "quantity": req.body["quantity"]
      };

      // prepare the request and the ibm api
      var options = {
        method: 'POST',
        url: 'https://api.us-south.apiconnect.appdomain.cloud/lasermusibmcom-dev/sb/capstone-1.0/Inventory',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-ibm-client-secret': json[2]["ClientSecret"],
          'x-ibm-client-id': json[2]["ClientId"]
        },
        body: data,
        json: true
      };

      // if request fails send 401, log it, and send back failed
      // if success send back 200
      request(options, function (error, response, body) {
        if (error) {
          console.error("Failed addItem: " + error.message)
          res.status(401);
          res.send('Failed:');
        } else {
          res.status(200);
          res.send('Success:');
        }
      });

    });
};

// so other files can call this function
module.exports = {
  addItem,
};
