/**
 * @module routes/controllers/adminDashboardManageOrdersSubOrderPage
 * @fileoverview adminDashboardManageOrdersSubOrderPage route's controller. Exports
 *    functions to be used by each route handler.
 * @exports {Object} Functions to attach to the `adminDashboardManageOrdersSubOrderPage` router.
 * @require cookie-helper
 * @require read-hidden
 */

 /* hidden
  * This is to read the hidden credentials file
  */
 var hidden = require('../../scripts/read-hidden.js');

 /* cookies
  * This is to help with handle cookies for user validation
  */
 const cookies = require('../../scripts/cookie-helper.js');

 const sessions = require('../../scripts/session-helper.js');

 const request = require('request');
/**
 * @function sendAdminDashboardManageOrdersSubOrderPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendAdminDashboardManageOrdersSubOrderPage = (req, res, next) => {
  // handle the cookies of a user and update them
  var orderId = req.baseUrl.split("/")[4];

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
                      // setup the api call and point it towards a single item
                      var options = {
                        method: 'GET',
                        url: 'https://api.us-south.apiconnect.appdomain.cloud/lasermusibmcom-dev/sb/capstone-1.0/Order/' + orderId,
                        headers:
                          { accept: 'application/json',
                            'x-ibm-client-secret': json[2]["ClientSecret"],
                            'x-ibm-client-id': json[2]["ClientId"] }
                      };

                      // if call fails log error and send back 400
                      // if call successful send back the single item's data
                      request(options, function (error, response, body) {
                        if (error) {
                          console.log("Failed getOrderId: " + error.message);
                          res.status(400);
                          res.setHeader('Content-Type', 'plain/text');
                          res.send();
                        } else {
                          console.log(body);
                          data = JSON.parse(body.toString())["data"]["orderList"];
                          console.log(data);
                          res.render('admin_dashboard-manage_orders-sub_order', {
                            title: 'Sprout Creek Farm Admin Dashboard | Sub Order',
                            page: 'Login',
                            "orders": data});
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
  sendAdminDashboardManageOrdersSubOrderPage,
};
