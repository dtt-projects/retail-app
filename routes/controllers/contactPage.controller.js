/**
 * @module routes/controllers/contactPage
 * @fileoverview contactPage route's controller. Exports
 *    functions to be used by each route handler.
 * @exports {Object} Functions to attach to the `contactPage` router.
 * @require session-helper
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

/**
 * @function sendContactPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendContactPage = (req, res, next) => {
  sessions.handleSession(req.cookies)
    .then(sessionId => {
      res.cookie("sessionId", sessionId);
      res.render('contact', {
        title: 'Sprout Creek Farm Contact',
        page: 'Contact' });
    });
};


module.exports = {
  sendContactPage,
};
