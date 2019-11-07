/**
 * @module routes/controllers/API_login
 * @fileoverview API_login route's controller. Handle all business logic
 * relative to login for the users.
 * @exports {Object} Functions to attach to the `users` router.
 */

 var hidden = require('../../scripts/read-hidden.js');
 const cookies = require('../../scripts/cookie-helper.js');


/**
 * @function getItems
 * @description Log a user in based on the received form data from the client.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const getItems = (req, res, next) => {
  //  read creds from the secret file
  hidden.readHidden()
    .then(json => {
      console.log("JSON");
      console.log(json);

      var mysql = require("mysql");
      var request = require("request");

      // connect to the database
      var con = mysql.createConnection({
        host: json[0]["host"],
        user: json[0]["user"],
        password: json[0]["password"],
        database: json[0]["database"]
      });
      con.connect(function(err) {
        if (err) {
          res.setHeader('Content-Type', 'plain/text');
          console.log(err);
        }
      });
      console.log("connected");

      var options ={
        method: 'GET',
        url: 'https://api.us-south.apiconnect.appdomain.cloud/lasermusibmcom-dev/sb/capstone-1.0/Inventory',
        headers:
          { accept: 'application/json',
            'x-ibm-client-secret': json[2]["ClientSecret"],
            'x-ibm-client-id': json[2]["ClientId"] }
      };

      request(options, function (error, response, body) {
        if (error) {
          res.send(error.message);
        } else {
          data = JSON.parse(body.toString())
          console.log(data);
          res.send(data["data"]["inventoryList"]);
        }
      });
    });
};

// so other files can call this function
module.exports = {
  getItems,
};
