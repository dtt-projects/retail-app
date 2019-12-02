/**
 * @module routes/controllers/API_addItem
 * @fileoverview API_addItem route's controller. Handle all business logic
 * relative to API_addItem for the users.
 * @exports {Object} Functions to attach to the `API_addItem` router.
 * @require read-hidden
 * @require session-helper
 * @require request
 */

 /* hidden
  * This is to read the hidden credentials file
  */
 const hidden = require('../../scripts/read-hidden.js');

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

 /* request
  * required package for request data from DB
  */
 const request = require("request");

/**
 * @function addItem
 * @description Add an item into the IBM DB based on client form
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const addItem = (req, res, next) => {
  // make sure an admin is making the call
  var sessionId = req.cookies["sessionId"];
  sessions.handleSessionIsAdmin(sessionId)
    .then(isAdmin => {
      if (isAdmin) {
        //  read creds from the secret file
        hidden.readHidden()
          .then(json => {
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
                url: json[2]["apiUrl"] + 'Inventory',
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
          } else {
            res.status(401);
            res.send();
          }
        });
};

// so other files can call this function
module.exports = {
  addItem,
};
