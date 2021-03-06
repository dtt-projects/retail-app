/**
 * @module routes/controllers/marketPage
 * @fileoverview marketPage route's controller. Exports functions to be used
 *     by each route handler.
 * @exports {Object} Functions to attach to the `marketPage` router.
 * @require session-helper
 * @require request
 */



/* request
 * This is for calling a request from the web server
 */
const request = require("request");

/* sessions
 * This is to help with handling sessions to maintain cart and auth
 */
const sessions = require('../../scripts/session-helper.js');

/**
 * @function sendMarketPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendMarketPage = (req, res, next) => {
  // handle the cookies of a user and update them
  sessions.handleSession(req.cookies)
    .then(sessionId => {
      res.cookie("sessionId", sessionId);
      // setup call for internal api call
      var options ={
        method: 'GET',
        url: 'http://' + req.headers["host"] + '/api/getItems',
      };

      // this sends out the request and either redirects to root(fail) or
      // will send and populate the market page
      request(options, function (error, response, body) {
        if (error) {
          console.log(error.message);
          res.redirect('/');
        } else {
          itemsList = JSON.parse(body.toString());
          sessions.handleSessionIsLoggedIn(sessionId)
            .then(isLoggedIn => {
              res.render('market', {
                title: 'Sprout Creek Farm Market',
                page: 'market',
                items: itemsList,
                "isLogged": isLoggedIn});
            });
        }
      });
    });
};

//This can be used for other pages as well
module.exports = {
  sendMarketPage,
};
