/**
 * @module routes/controllers/cartPage
 * @fileoverview cartPage route's controller. Exports functions to be used by
 *    each route handler.
 * @exports {Object} Functions to attach to the `cartPage` router.
 * @require session-helper
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

 const request = require('request');


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

  // updates and validates user's cookies
  sessions.handleSession(req.cookies)
    .then(sessionId => {
      res.cookie("sessionId", sessionId);
      sessions.handleSessionGetCart(sessionId)
        .then(cart => {
          var keys = Object.keys(cart);
          // has values in cart
          var cartDisplay = [];
          console.log("before key length if")
          if (keys.length > 0) {
            keys.forEach(function(key) {
              var amount = cart[key];
              // setup url for api call
              var options = {
                method: 'GET',
                url: 'http://' + req.headers["host"] + '/api/getItem/' + key,
              };
              // make the request to get a single item from IBM DB
              // if error send user back to root admin Inventory page
              // if sucess populate the item page
              request(options, function (error, response, body) {
                if (error) {
                  console.log(error.message);
                } else {
                  //itemsList = JSON.parse(body.toString())
                  var data = JSON.parse(body.toString())[0];
                  console.log("else")
                  cartDisplay.push({"img": data["itemimagelink"]
                                  , "name": data["itemname"]
                                  , "cat": data["itemcat"]
                                  , "price": data["price"]
                                  , "quantity": cart[key]
                                  , "itemId": key
                                  , "total": data["price"] * cart[key]
                                  , "maxQuantity": data["quantity"]
                                });
                  console.log("before length check");
                  if (cartDisplay.length == keys.length) {
                    console.log(cartDisplay);
                    sessions.handleSessionIsLoggedIn(sessionId)
                      .then(isLoggedIn => {
                        res.render('cart', {
                          title: 'Sprout Creek Farm Cart',
                          page: 'cart',
                          items: cartDisplay,
                          "isLogged": isLoggedIn});
                      });
                  }
                }
              });
            })
          // empty cart
          } else {
            console.log("in empty cart")
            res.render('cart', {
              title: 'Sprout Creek Farm Cart',
              page: 'cart',
              msg: 'Your cart is empty'});
            return;
          }
        })
  });
};


module.exports = {
  sendCartPage,
};
