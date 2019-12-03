/**
 * @module routes/controllers/AdminDashboardManageOrdersPage
 * @fileoverview AdminDashboardManageOrdersPage route's controller.
 *    Exports functions to be used by each route handler.
 * @exports {Object} Functions to attach to the
 *    `AdminDashboardManageOrdersPage` router.
 * @require sessions-helper
 * @require request
 * @require hidden
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

 const request = require("request");

const hidden = require("../../scripts/read-hidden.js")

const mysql = require('mysql');

/**
 * @function sendAdminDashboardManageOrdersPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendAdminDashboardManageOrdersPage = (req, res, next) => {
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
                  sessions.handleSessionGetSessionInfo(sessionId)
                    .then(aid => {
                      hidden.readHidden()
                        .then(json => {
                          // connect to db
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

                          var statement = ("SELECT * FROM accounts where aid=" + aid);
                          con.query(statement, function(err, result) {
                          if (err) {
                            console.log(err);
                            res.status(400);
                            res.setHeader('Content-Type', 'plain/text');
                            res.redirect("/");
                          } else {
                            var userInfo = result[0];
                            console.log(userInfo);

                            // kill the db connection
                            con.end();

                            var options = { method: 'GET',
                              url: json[2]["apiUrl"] + 'Order',
                              headers:
                               { accept: 'application/json',
                                 'x-ibm-client-secret': json[2]["ClientSecret"],
                                 'x-ibm-client-id': json[2]["ClientId"] } };

                            request(options, function (error, response, body) {
                              if (error) {
                                console.error('Failed: %s', error.message);
                                res.status(400);
                                res.send();
                                return
                              } else {
                                console.log('Success: ', body);
                                body = JSON.parse(body);
                                var orders = body["data"]["orderList"];
                                var hasOrders = true;
                                if (orders.length == 0) {
                                  hasOrders = false;
                                }

                                res.render('admin_dashboard-manage_orders', {
                                  title: 'Sprout Creek Farm Admin Dashboard',
                                  page: 'login',
                                  "isDashboard": true,
                                  "userInfo": userInfo,
                                  "hasOrders": hasOrders,
                                  "orders": orders});
                              }
                            });
                          }
                        });
                        })
                    })
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

// exports so other files can use it
module.exports = {
  sendAdminDashboardManageOrdersPage,
};
