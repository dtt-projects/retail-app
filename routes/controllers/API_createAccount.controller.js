/**
 * @module routes/controllers/API_createAccount
 * @fileoverview API_createAccount route's controller. Handle all business
 * logic relative to creating an account.
 * @exports {Object} Functions to attach to the `API_createAccount` router.
 * @require session-helper
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

/**
 * @function createAccount
 * @description Create an account based on the form data and validate.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const createAccount = (req, res, next) => {
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
        var statement = "";
        // if request came from admin dashboard
        if (req.headers.referer.includes("/admin_dashboard/manage_accounts/create_account")) {
          // current insert statement for database
          statement = ("INSERT INTO accounts(FIRSTNAME, LASTNAME, ADDRESS," +
                       " CITY, ZIP, EMAIL, PHONENUMBER, USERNAME, PASSWORD, " +
                       "CREATIONDATE, UPDATEDDATE, ISACTIVE, ISADMIN)" +
                       "VALUES('" + req.body["first_name"] + "' ," +
                              "'" + req.body["last_name"] + "' ," +
                              "'" + req.body["address"] + "' ," +
                              "'" + req.body["city"] + "' ," +
                              "'" + req.body["zip"] + "' ," +
                              "'" + req.body["email"] + "' ," +
                              "'" + req.body["phone_number"] + "' ," +
                              "'" + req.body["username"] + "' ," +
                              "'" + req.body["password"] + "' ," +
                              "CURRENT_TIMESTAMP, " +
                              "CURRENT_TIMESTAMP, " +
                              "True, " +
                              req.body["isAdmin"] + ")");
        } else {
          // current insert statement for database
          statement = ("INSERT INTO accounts(FIRSTNAME, LASTNAME, ADDRESS," +
                       " CITY, ZIP, EMAIL, PHONENUMBER, USERNAME, PASSWORD, " +
                       "CREATIONDATE, UPDATEDDATE, ISACTIVE, ISADMIN)" +
                       "VALUES('" + req.body["first_name"] + "' ," +
                              "'" + req.body["last_name"] + "' ," +
                              "'" + req.body["address"] + "' ," +
                              "'" + req.body["city"] + "' ," +
                              "'" + req.body["zip"] + "' ," +
                              "'" + req.body["email"] + "' ," +
                              "'" + req.body["phone_number"] + "' ," +
                              "'" + req.body["username"] + "' ," +
                              "'" + req.body["password"] + "' ," +
                              "CURRENT_TIMESTAMP, " +
                              "CURRENT_TIMESTAMP, " +
                              "True, " +
                              "False)");
        }
        // run statement on the database
        con.query(statement, function(err, result) {
          if (err) {
            console.log(err);
            res.status(400);
            res.setHeader('Content-Type', 'plain/text');
            res.send("Account creation failed!");
          } else {
            // statement was successful
            var nodemailer = require('nodemailer');

            // setup gmail email system from secret file
            var transporter = nodemailer.createTransport({
              service: 'gmail',
                auth: {
                  user: json[1]["email"],
                  pass: json[1]["password"]
                }
            });

            var emailContent = ('<!DOCTYPE html><html><head>' +
            '<title>Welcome to Sprout Creek Farm!</title></head>' +
            '<body><h1 style="text-align:center;">Welcome to Sprout Creek Farm!</h1>' +
            '<p>Hello ' + req.body["first_name"] + ',</p>' +
            '<p>Welcome to Sprout Creek Farm. Thank you for ' +
            'signing up and joining our community. Now that ' +
            'you are a member, here is a list of the benefits ' +
            'that are available to you:</p><ul><li>Goat points - When ' +
            'purchasing cheese from us, you will receive goat points. If you' +
            ' collect enough goat points, you will be able to use your goat' +
            ' points to get special items.</li><li>Promotions - You will ' +
            'receive emails when there are special promotions going on with ' +
            'our selection of cheeses.</li><li>Events - You will be updated ' +
            'on upcoming events and the times and dates of those events.</li>' +
            '<li>Blog - As a member, you will have the ability to blog and ' +
            'communicate not only with us, but with other members of our ' +
            'community.</li></ul><p>Please follow us on any of our social ' +
            'media sites by clicking the links below:</p><ul><li> ' +
            '<a href="https://www.facebook.com/sproutcreekfarm#">Facebook</a>' +
            '</li><li><a href="https://twitter.com/SproutCreekFarm">Twitter</a>' +
            '</li><li><a href="https://sproutcreekfarm.org">Flickr</a></li><li>' +
            '<a href="https://www.youtube.com/user/SproutCreekFarm">Youtube</a>' +
            '</li><li><a href="https://www.pinterest.com/search/pins/?q=sproutcreek' +
            'farm%20or%20%22Sprout%20Creek%20Farm%22&term_meta%5B%5D=sproutcreekfarm+o'+
            'r+%22Sprout+Creek+Farm%22%7Ctyped">Pinterest</a></li><li>' +
            '<a href="https://www.instagram.com/sproutcreekfarm/">Instagram</a>' +
            '</li><li><a href="https://sproutcreekfarm.org/email">Email</a></li>' +
            '</ul><p>Thank you again for joining our community and we hope you ' +
            'enjoy what we have to offer.</p><footer><img src="https://sproutcreek' +
            'farm.org/sites/all/themes/sproutcreek/logo.png" alt="Logo" ' +
            'style="float:left" width="6%" height="6%"><p style="float:left">' +
            'Address: 34 Lauer Road | Poughkeepsie, NY 12603<br></br>Contact ' +
            'Information: 845-485-8438 office | 845-485-9885 market<br></br>' +
            'Email: <a href="mailto:info@sproutcreekfarm.org">' +
            'info@sproutcreekfarm.org</a></p></footer></body></html>');

            // email from, to, subject, text
            var mailOptions = {
              from: 'compscigoat@gmail.com',
              to:   req.body["email"],
              subject: 'Welcome to Sprout Creek Farm',
              html: emailContent
            };

            // send the email out
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              }
            });

            data = {
              "username": req.body["username"],
              "password": req.body["password"],
              "isAdmin": 0,
              "email": req.body["email"]
            }
            // setup rewards id
            var statement2 = ("SELECT aid FROM accounts WHERE email='"
                + req.body["email"] + "'");
            con.query(statement2, function(err2, result2) {
              // error with getting aid
              if (err2) {
                console.error(err2);
                con.end();
                res.status(400);
                res.send();
              // got aid now we gotta build out the rewards
              } else if (result2.length > 0) {
                var aid = result2[0]["aid"];
                var statement3 = ("INSERT INTO "
                    + "rewards(aid, goatpoints, lastpurchase, changeInGoatPoints, updateddate) "
                    + "VALUES('" + aid + "', 0, CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP)");
                console.log(statement3);
                con.query(statement3,function(err3, result3) {
                  // if error inserting into DB
                  if (err3) {
                    console.error(err3);
                    con.end();
                    res.status(400);
                    res.send();
                  } else {
                    con.end();
                  }
                });
              // user's aid doesnt exist
              } else {
                console.log("API_creatAccount: aid doesn't exist");
              }
            });

            // setup ibm customer

            // build the user a cookie
            cookies.handleCreateAccountCookie(data)
              .then(res_cookie => {
                res.cookie("CID", res_cookie);
                // send success back to client
                //console.log("COOKIE DONE");
                res.setHeader('Content-Type', 'plain/text');
                res.status(200);
                res.send("Account created!");
              });
          }
        });
      }
  });
};

// allows use outside of the file
module.exports = {
  createAccount,
};
