/**
 * @module routes/controllers/API_updateItem
 * @fileoverview API_updateItem route's controller. Handle all business logic
 *    relative to API_updateItem for the DB
 * @exports {Object} Functions to attach to the `API_updateItem` router.
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
 * @function updateItem
 * @description update an item in the DB based on data from the client.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const updateItem = (req, res, next) => {
  // make sure an admin is making the call
  var sessionId = req.cookies["sessionId"];
  sessions.handleSessionIsAdmin(sessionId)
    .then(isAdmin => {
      if (isAdmin) {
        //  read creds from the secret file
        hidden.readHidden()
          .then(json => {
            // connect to the database
            var con = mysql.createConnection({
              host: json[0]["host"],
              user: json[0]["user"],
              password: json[0]["password"],
              database: json[0]["database"]
            });
            con.connect(function(err) {
              if (err) {
                console.log(err);
              }
            });
            console.log("connected");

            // prepare the data for transmission
            var data = {
              "merchantId" : req.body["merchantId"],
              "name" : req.body["name"],
              "cat": req.body["cat"],
              "desc": req.body["desc"],
              "imageLink": req.body["imageLink"],
              "price": req.body["price"],
              "quantity": req.body["quantity"]
            };

            // build out the request for the api call
            var options = {
              method: 'PUT',
              url: 'https://api.us-south.apiconnect.appdomain.cloud/lasermusibmcom-dev/sb/capstone-1.0/Inventory/' + req.body["itemId"],
              headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'x-ibm-client-secret': json[2]["ClientSecret"],
                'x-ibm-client-id': json[2]["ClientId"]
              },
              body: data,
              json: true
            };

            // based on request either send back failure and log it
            // or send back success code
            request(options, function (error, response, body) {
              if (error) {
                console.error('Failed updateItem: %s', error.message);
                res.status(400);
                res.send();
              } else {
                res.status(200);
                res.send();
                console.log('Success: ', body);
              }
            });

          });
      } else {
        return;
      }



    });
};

// so other files can call this function
module.exports = {
  updateItem,
};
