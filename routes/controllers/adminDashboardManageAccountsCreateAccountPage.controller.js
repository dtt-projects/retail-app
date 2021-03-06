/**
 * @module routes/controllers/adminDashboardManageAccountsCreateAccountPage
 * @fileoverview adminDashboardManageAccountsCreateAccountPage route's controller. Exports
 *    functions to be used by each route handler.
 * @exports {Object} Functions to attach to the `adminDashboardManageAccountsCreateAccountPage` router.
 * @require session-helper
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

/**
 * @function sendAdminDashboardManageAccountsCreateAccountPage
 * @description Send the create account page.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendAdminDashboardManageAccountsCreateAccountPage = (req, res, next) => {
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
                  res.render('admin_dashboard-manage_accounts-create_account', {
                    title: 'Sprout Creek Farm Admin Dashboard | Create Account',
                    page: 'login',
                    "isDashboard": true});
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
  sendAdminDashboardManageAccountsCreateAccountPage,
};
