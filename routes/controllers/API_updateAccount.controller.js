/**
 * @module routes/controllers/API_updateAccount
 * @fileoverview API_updateAccount route's controller. Handle all business
 * logic relative to updating an account.
 * @exports {Object} Functions to attach to the `API_updateAccount` router.
 * @require session-helper
 * @require request
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

 /* request
  * required package for request data from DB
  */
 const request = require("request");

/**
 * @function updateAccount
 * @description Create an account based on the form data and validate.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const updateAccount = (req, res, next) => {
  // read database creds from secret file
  const fs = require("fs");
  fs.readFile('.hiddenCreds', (err, data) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.setHeader('Content-Type', 'plain/text');
        res.send("Account creation failed!");
      } else {
        // get file data and convert to json
        json = JSON.parse(data.toString());
        var email = req.body["email"];
        var mysql = require("mysql");

        // log into database
        var con = mysql.createConnection({
          host: json[0]["host"],
          user: json[0]["user"],
          password: json[0]["password"],
          database: json[0]["database"]
        });
        con.connect(function(err) {
          if (err) {
            console.log(err);
            res.status(400);
            res.setHeader('Content-Type', 'plain/text');
            res.send("Account creation failed!");
          }
        });
        var statement = ""
        // current insert statement for database
        if (req.body["password"] == "") {
          statement = ("UPDATE accounts SET FIRSTNAME='"
              + req.body["first_name"]
              + "', LASTNAME='" + req.body["last_name"]
              + "', ADDRESS='" + req.body["address"]
              + "', CITY='" + req.body["city"]
              + "', ZIP='" + req.body["zip"]
              + "', PHONENUMBER='" + req.body["phone_number"]
              + "', UPDATEDDATE='CURRENT_TIMESTAMP'"
              + "', STATE='" + req.body["state"] + "'"
              + "WHERE aid='" + req.body["aid"] + "'");
        } else {
          statement = ("UPDATE accounts SET FIRSTNAME='"
              + req.body["first_name"]
              + "', LASTNAME='" + req.body["last_name"]
              + "', ADDRESS='" + req.body["address"]
              + "', CITY='" + req.body["city"]
              + "', ZIP='" + req.body["zip"]
              + "', PHONENUMBER='" + req.body["phone_number"]
              + "', PASSWORD='" + req.body["password"]
              + "', UPDATEDDATE='CURRENT_TIMESTAMP'"
              + "', STATE='" + req.body["state"] + "'"
              + "WHERE aid='" + req.body["aid"] + "'");
        }


        // run statement on the database
        con.query(statement, function(err, result) {
          if (err) {
            console.log(err);
            res.status(400);
            res.setHeader('Content-Type', 'plain/text');
            res.send("Account creation failed!");
          } else {
            // statement was successfulw3
            // update ibm customer
            var statement2 = ("SELECT ibmid FROM ibm where aid=" + req.body["aid"]);
            con.query(statement2, function(err2, result2) {
              if (err2) {
                console.log(err2);
                res.status(400);
                con.end();
                res.send();
                return;
              } else if (result2.length > 0) {
                // use ibm id to ref ibm account
                var ibmId = result2[0]["ibm"];

                // setup to update customer on ibm DB
                var options = {
                  method: 'PUT',
                  url: 'https://api.us-south.apiconnect.appdomain.cloud/lasermusibmcom-dev/sb/capstone-1.0/Customer/' + ibmId,
                  headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'x-ibm-client-secret': json[2]["ClientSecret"],
                    'x-ibm-client-id': json[2]["ClientId"]
                  },
                  // the body so it matches our system
                  body: {
                    firstName: req.body["first_name"],
                    lastName: req.body["last_name"],
                    address1: req.body["address"],
                    city: req.body["city"],
                    state: req.body["state"],
                    zip: req.body["zip"],
                    phoneHome: req.body["phone_number"],
                  },
                  json: true
                };mm


              } else {
                console.log("That aid doesn't exist");
                res.status(400);
                con.end();
                res.sent();
                return;
              }
            })
            }
          });
      }
  });
};

// allows use outside of the file
module.exports = {
  updateAccount,
};
