/**
 * @module routes/controllers/checkOutPage
 * @fileoverview checkOutPage route's controller. Exports functions to be
 *    used by each route handler.
 * @exports {Object} Functions to attach to the `checkOutPage` router.
 * @require cookie-helper
 */

 /* cookies
  * This is to help with handle cookies for user validation
  */
const cookies = require('../../scripts/cookie-helper.js');

/**
 * @function sendCheckOutPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendCheckOutPage = (req, res, next) => {
  // updates and validates user's cookies
  cookies.handleNormalPageCookie(req.cookies)
    .then(res_cookie => {
      if (res_cookie == "undefined" || res_cookie == null) {
        res.clearCookie("CID");
      } else {
        res.cookie("CID", res_cookie);
      }
      res.render('check_out', { title: 'Sprout Creek Farm Check Out',
                                 page: 'cart' });
    });
};


module.exports = {
  sendCheckOutPage,
};
