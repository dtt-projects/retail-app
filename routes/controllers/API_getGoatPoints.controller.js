/**
 * @module routes/controllers/API_getGoatPoints
 * @fileoverview API_getGoatPoints route's controller. Handle all business logic
 * relative to API_getGoatPoints for the users.
 * @exports {Object} Functions to attach to the `API_getGoatPoints` router.
 * @require read-hidden
 * @require session-helper
 * @require mysql
 * @require request
 */

 /* hidden
  * This is to read the hidden credentials file
  */
 var hidden = require('../../scripts/read-hidden.js');

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

 const mysql = require("mysql");
 const request = require("request");



/**
 * @function getGoatPoints
 * @description Get goat points for a single user
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const getGoatPoints = (req, res, next) => {
  //  read creds from the secret file
  hidden.readHidden()
    .then(json => {
      // updates and validates the user's cookies
      var sessionId = req.body["sessionId"];
      sessions.handleSessionGetSessionInfo(sessionId)
        .then(aid => {
          // didnt get aid from session
          if (aid == null) {
            res.status(401);
            res.send();
          } else {
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
                res.setHeader('Content-Type', 'plain/text');
                res.status(400);
                res.redirect("/");
              }
            });

            var statement = ("SELECT goatPoints FROM rewards WHERE "
                + "aid=" + aid)
            con.query(statement, function(err, result) {
              if (err) {
                console.log(err);
                res.status(400);
                res.setHeader('Content-Type', 'plain/text');
                con.end();
                res.send("getting goatPoints failed!");
              } else if (result.length > 0) {
                var goatPoints = result[0];
                res.status(200);
                res.setHeader('Content-Type', 'application/json');
                con.end();
                res.send(goatPoints);
              } else {
                console.log(err);
                res.status(400);
                res.setHeader('Content-Type', 'plain/text');
                con.end();
                res.send("user doesnt exist failed!");
              }
            });
          }
        });
      });
};

// so other files can call this function
module.exports = {
  getGoatPoints,
};
