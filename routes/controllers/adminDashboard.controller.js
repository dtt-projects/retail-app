/**
 * @module routes/controllers/login
 * @fileoverview Login route's controller. Exports functions to be used by each
 *    route handler.
 * @exports {Object} Functions to attach to the `login` router.
 */
 const cookies = require('../../scripts/cookie-helper.js');


/**
 * @function sendLoginPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendAdminDashboardPage = (req, res, next) => {
  console.log("qwerty");
  console.log(req.cookies);
  cookies.handleNormalPageCookie(req.cookies)
    .then(res_cookie => {
      console.log(res_cookie);
      if (res_cookie == "undefined" || res_cookie == null) {
        res.clearCookie("CID");
        res.redirect("login");
      } else {
        res.cookie("CID", res_cookie);
        if (res_cookie["isAdmin"] == 1) {
          res.render('admin_dashboard', { title: 'Sprout Creek Farm Admin Dashboard',
                                          page: 'login',
                                          email: res_cookie["email"]});
        } else {
          res.redirect('user_dashboard')
        }
      }

    });
};


module.exports = {
  sendAdminDashboardPage,
};
