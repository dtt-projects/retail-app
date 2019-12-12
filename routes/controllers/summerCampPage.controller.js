/**
 * @module routes/controllers/summerCampPage
 * @fileoverview summerCampPage route's controller. Exports
 *    functions to be used by each route handler.
 * @exports {Object} Functions to attach to the `summerCampPage` router.
 * @require session-helper
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

/**
 * @function sendSummerCampPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendSummerCampPage = (req, res, next) => {
  sessions.handleSession(req.cookies)
    .then(sessionId => {
      res.cookie("sessionId", sessionId);
      sessions.handleSessionIsLoggedIn(sessionId)
        .then(isLoggedIn => {
          res.render('summerCamp', {
            title: 'Sprout Creek Farm Summer Camp Page',
            page: 'Support',
            "isLogged": isLoggedIn});
        });
    });
};

//This can be used on other pages now
module.exports = {
  sendSummerCampPage,
};
