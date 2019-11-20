/**
 * @module routes/controllers/marketItemPage
 * @fileoverview marketItemPage route's controller. Exports functions
 *    to be used by each route handler.
 * @exports {Object} Functions to attach to the `marketItemPage` router.
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
 * @function sendMarketItemPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendMarketItemPage = (req, res, next) => {
  // will get the item id
  // will be used to call api and use the system
  var itemNum = req.baseUrl.split("/")[2];
  // update user cookies first
  sessions.handleSession(req.cookies)
    .then(sessionId => {
      res.cookie("sessionId", sessionId);
      // setup url for api call
      var options ={
        method: 'GET',
        url: 'http://' + req.headers["host"] + '/api/getItem/' + itemNum,
      };

      // make the request to get a single item from IBM DB
      // if error send user back to root page
      // if sucess populate an item page
      request(options, function (error, response, body) {
        if (error) {
          console.log(error.message);
          res.redirect('/');
        } else {
          //itemsList = JSON.parse(body.toString())
          var data = JSON.parse(body.toString());
          console.log(data[0]["itemname"]);
          res.render('marketItem', {
            title: "Sprout Creek Farm Market | " + data[0]["itemname"],
            page: 'market',
            item: data});
        }
      });
    });
};


module.exports = {
  sendMarketItemPage,
};
