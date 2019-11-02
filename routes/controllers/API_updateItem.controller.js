/**
 * @module routes/controllers/API_login
 * @fileoverview API_login route's controller. Handle all business logic
 * relative to login for the users.
 * @exports {Object} Functions to attach to the `users` router.
 */

 var hidden = require('../../scripts/read-hidden.js');
 const cookies = require('../../scripts/cookie-helper.js');


/**
 * @function login
 * @description Log a user in based on the received form data from the client.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const updateItem = (req, res, next) => {
  // Capture user-submitted form from client.
  // get item information
  console.log("here");
  merchantId = req.body["merchantId"];
  name = req.body["name"];
  cat = req.body["cat"];
  desc = req.body["desc"];
  imageLink = req.body["imageLink"];
  price = req.body["price"];
  quantity = req.body["quantity"];


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
          console.log(err);
        }
      });
      console.log("connected");

      var data = {
        "merchantId" : merchantId,
        "name" : name,
        "cat": cat,
        "desc": desc,
        "imageLink": imageLink,
        "price": price,
        "quantity": quantity
      };

      console.log(data);

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

      request(options, function (error, response, body) {
        if (error) {
          return console.error('Failed: %s', error.message);
        }
        console.log('Success: ', body);
      });

    });
};

// so other files can call this function
module.exports = {
  updateItem,
};
