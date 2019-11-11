/**
 * @module routes/controllers/adminDashboardManageAccountsCreateInventoryPage
 * @fileoverview adminDashboardManageAccountsCreateInventoryPage route's controller.
 *    Exports functions to be used by each route handler.
 * @exports {Object} Functions to attach to the
 *    `adminDashboardManageAccountsCreateInventoryPage` router.
 * @require cookie-helper
 */

 /* cookies
  * This is to help with handle cookies for user validation
  */
 const cookies = require('../../scripts/cookie-helper.js');

/**
 * @function sendAdminDashboardManageAccountsCreateInventoryPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendAdminDashboardManageAccountsCreateInventoryPage = (req, res, next) => {
  // checks and validates user's cookie
  cookies.handleNormalPageCookie(req.cookies)
    .then(res_cookie => {
      // invalid cookie send back to login
      if (res_cookie == "undefined" || res_cookie == null) {
        res.clearCookie("CID");
        res.redirect("../login");
      // valid cookie send to admin manage accounts if admin
      // if not admin cookie send to userdashboard
      } else {
        res.cookie("CID", res_cookie);
        if (res_cookie["isAdmin"] == 1) {
          res.render('admin_dashboard-manage_accounts-create_inventory_page', {
            title: 'Sprout Creek Farm Admin Dashboard | Create Inventory',
            page: 'login',
            email: res_cookie["email"]});
        } else {
          res.redirect('user_dashboard')
        }
      }
    });
};

// exports so other files can call it
module.exports = {
  sendAdminDashboardManageAccountsCreateInventoryPage,
};
