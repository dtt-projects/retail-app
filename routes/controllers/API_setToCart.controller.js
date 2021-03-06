/**
 * Express module.
 * @type {Object}
 * @constant/**
 * @module routes/controllers/API_setToCart
 * @fileoverview API_setToCart route's controller. Exports
 *    functions to be used by each route handler.
 * @exports {Object} Functions to attach to the `API_setToCart` router.
 * @require session-helper
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

/**
 * @function setToCart
 * @description Update the cart and set its items
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const setToCart = (req, res, next) => {
  // make sure an admin is making the call
  var sessionId = req.cookies["sessionId"];
  var itemId = req.body["itemId"];
  var amount = req.body["amount"];

  sessions.handleSessionSetCartItem(sessionId, itemId, amount)
    .then(isSuccessful => {
      if (isSuccessful) {
        res.status(200);
        res.send("Great Success!");
        console.log("Great Success!");
        return;
      } else {
        res.status(400);
        res.send("Big Failure");
        console.log("Big Failure");
        return;
      }
    })
};

// so other files can call this function
module.exports = {
  setToCart,
};
