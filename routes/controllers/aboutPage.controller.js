/**
 * @module routes/controllers/aboutPage
 * @fileoverview aboutPage route's controller. Exports
 *    functions to be used by each route handler.
 * @exports {Object} Functions to attach to the `aboutPage` router.
 * @require session-helper
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

/**
 * @function sendAboutPage
 * @description Send the about static page to the user
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendAboutPage = (req, res, next) => {
  // will check the user's cookie if they have a session or // NOTE:
  // will then return a session or update current one
  sessions.handleSession(req.cookies)
    .then(sessionId => {
      res.cookie("sessionId", sessionId);
      sessions.handleSessionIsLoggedIn(sessionId)
        .then(isLoggedIn => {
          res.render('about', {
            title: 'Sprout Creek Farm About',
            page: 'About',
            "isLogged": isLoggedIn});
        });
    });
};

// exports so other files can call it
module.exports = {
  sendAboutPage,
};
