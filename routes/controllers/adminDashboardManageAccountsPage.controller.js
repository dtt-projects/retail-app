/**
 * @module routes/controllers/adminDashboardManageAccountsPage
 * @fileoverview adminDashboardManageAccountsPage route's controller.
 *    Exports functions to be used by each route handler.
 * @exports {Object} Functions to attach to the
 *    `adminDashboardManageAccountsPage` router.
 * @require cookie-helper
 */

 /* cookies
  * This is to help with handle cookies for user validation
  */
 const cookies = require('../../scripts/cookie-helper.js');

 const sessions = require('../../scripts/session-helper.js');

/**
 * @function sendAdminDashboardManageAccountsPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendAdminDashboardManageAccountsPage = (req, res, next) => {
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
                  const request = require("request");

                  //  testing of base url
                  var options ={
                    method: 'GET',
                    url: 'http://' + req.headers["host"] + '/api/getAllAccounts',
                    body: req.cookies,
                    json: true
                  };

                  // the request on failure log and redirect back
                  // on success send to page and populate it
                  request(options, function (error, response, body) {
                    if (error) {
                      console.log(error.message);
                      res.status(400);
                      res.redirect('../admin_dashboard');
                    } else {
                      console.log(body);
                      var accounts = body;//JSON.parse(body.toString());
                      res.render('admin_dashboard-manage_accounts', {
                        title: 'Sprout Creek Farm Admin Dashboard | Accounts',
                        page: 'login',
                        "accounts": accounts});
                    }
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

// exports so other files can call it
module.exports = {
  sendAdminDashboardManageAccountsPage,
};
