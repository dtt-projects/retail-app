/**
 * @module routes/controllers/API_logout
 * @fileoverview API_logout route's controller. Exports
 *    functions to be used by each route handler.
 * @exports {Object} Functions to attach to the `API_logout` router.
 * @require session-helper
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

/**
 * @function logout
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const logout = (req, res, next) => {
  var sessionId = req.cookies["sessionId"];
  sessions.handleSessionDeleteSession(sessionId)
    .then(result => {
      if (result) {
        res.clearCookie("sessionId");
        res.redirect("/login");
      } else {
        res.clearCookie("sessionId");
        res.redirect("/login");
      }

    })
};

// so other files can call this function
module.exports = {
  logout,
};
