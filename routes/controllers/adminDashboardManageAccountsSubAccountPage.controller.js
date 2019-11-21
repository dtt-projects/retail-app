/**
 * @module routes/controllers/adminDashboardManageAccountsSubAccountPage
 * @fileoverview adminDashboardManageAccountsSubAccountPage route's controller. Exports
 *    functions to be used by each route handler.
 * @exports {Object} Functions to attach to the `adminDashboardManageAccountsSubAccountPage` router.
 * @require session-helper
 * @require read-hidden
 */

 /* hidden
  * This is to read the hidden credentials file
  */
 const hidden = require('../../scripts/read-hidden.js');

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

/**
 * @function sendAdminDashboardManageAccountsSubAccountPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendAdminDashboardManageAccountsSubAccountPage = (req, res, next) => {
  // handle the cookies of a user and update them
  var aid = req.baseUrl.split("/")[4];

  // check their session and update it
  sessions.handleSession(req.cookies)
    .then(sessionId => {
      res.cookie("sessionId", sessionId);
      sessions.handleSessionIsLoggedIn(sessionId)
        .then(isLoggedIn => {
          // user is logged in check if admin or normal user
          if (isLoggedIn) {
            sessions.handleSessionIsAdmin(sessionId)
              .then(isAdmin => {
                // user is an admin
                if (isAdmin) {
                  hidden.readHidden()
                    .then(json => {
                      // required packages for db connection
                      var mysql = require("mysql");

                      // connect to the database
                      var con = mysql.createConnection({
                        host: json[0]["host"],
                        user: json[0]["user"],
                        password: json[0]["password"],
                        database: json[0]["database"],
                        dateStrings: true
                      });
                      con.connect(function(err) {
                        if (err) {
                          console.log(err);
                          //res.setHeader('Content-Type', 'plain/text');
                          res.status(400);
                          res.send();
                        }
                      });

                      // get all the account info for a user
                      var statement = ("SELECT * from accounts "
                          + "where aid=" + aid);
                      con.query(statement, function(err, result) {
                        if (err) {
                          console.log(err);
                          res.status(400);
                          //res.setHeader('Content-Type', 'plain/text');
                          con.end();
                          //res.send("getting account info failed!");
                        // got account data
                        } else if (result.length > 0) {
                          res.status(200);
                          //res.setHeader('Content-Type', 'text/html');
                          con.end();
                          var account = result
                          res.render('admin_dashboard-manage_accounts-sub_account', {
                            title: 'Sprout Creek Farm Admin Dashboard | Sub Account',
                            page: 'login',
                            "account": account});
                        // aid doesnt exist
                        } else {
                          console.log(err);
                          res.status(400);
                          //res.setHeader('Content-Type', 'plain/text');
                          con.end();
                          //res.send("user doesnt exist failed!");
                        }
                      });
                    });
                // user is not an admin
                } else {
                  res.redirect("/user_dashboard");
                }
              })
          // user isnt logged in render login page
          } else {
            res.redirect("/login");
          }
        })
    });
};


module.exports = {
  sendAdminDashboardManageAccountsSubAccountPage,
};