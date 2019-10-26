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
const sendLoginPage = (req, res, next) => {
  console.log("login page render");
  // doesnt have a cookie for their account

  cookies.handleNormalPageCookie(req.cookies)
    .then(res_cookie => {
      if (res_cookie == null || res_cookie == "undefined") {
        res.clearCookie("CID");
      } else {
        res.cookie("CID", res_cookie);
      }
      page = "";
      if (req.cookies["CID"] == null || req.cookies["CID"] == "undefined") {
        page = "login";
      // check if the cookie is valid
      } else {
        if (req.cookies["CID"]["isAdmin"] == 1) {
          page = "admin_dashboard";
        } else {
          page = "user_dashboard";
        }
      }
      if (page == "login") {
        res.render(page, { title: 'Sprout Creek Farm Login',
                           page: 'login' });
      } else {
        res.redirect(page);

      }
    });
};


module.exports = {
  sendLoginPage,
};
