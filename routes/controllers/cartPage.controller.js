/**
 * @module routes/controllers/cartPage
 * @fileoverview cartPage route's controller. Exports functions to be used by
 *    each route handler.
 * @exports {Object} Functions to attach to the `cartPage` router.
 * @require cookie-helper
 */

 /* cookies
  * This is to help with handle cookies for user validation
  */
 const cookies = require('../../scripts/cookie-helper.js');


/**
 * @function sendCartPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendCartPage = (req, res, next) => {
  // updates and validates the user's cookies
  cookies.handleNormalPageCookie(req.cookies)
    .then(res_cookie => {
      if (res_cookie == "undefined" || res_cookie == null) {
        res.clearCookie("CID");
      } else {
        res.cookie("CID", res_cookie);
      }
      res.render('cart', { title: 'Sprout Creek Farm Cart',
                           page: 'cart' });
  });
};


module.exports = {
  sendCartPage,
};
