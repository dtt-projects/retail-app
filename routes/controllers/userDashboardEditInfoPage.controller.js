/**
 * @module routes/controllers/userDashboardEditInfoPage
 * @fileoverview userDashboardEditInfoPage route's controller.
 *    Exports functions to be used by each route handler.
 * @exports {Object} Functions to attach to the
 *    `userDashboardEditInfoPage` router.
 * @require cookie-helper
 */

 /* cookies
  * This is to help with handle cookies for user validation
  */
 const cookies = require('../../scripts/cookie-helper.js');

 /* request
  * This is for calling a request from the web server
  */
 const request = require("request");

/**
 * @function sendUserDashboardEditInfoPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendUserDashboardEditInfoPage = (req, res, next) => {
  // handle the cookies of a user and update them
  cookies.handleNormalPageCookie(req.cookies)
    .then(res_cookie => {
      if (res_cookie == "undefined" || res_cookie == null) {
        res.clearCookie("CID");
        res.redirect("../login");
      } else {
        res.cookie("CID", res_cookie);
        // user is an admin or not direct correctly
        if (res_cookie["isAdmin"] == 1) {
          res.redirect("../admin_dashboard");
        } else {
          // setup call for internal api call
          var options ={
            method: 'GET',
            url: 'http://' + req.headers["host"] + '/api/getAccount',
            body: res_cookie,
            json: true
          };

          // this sends out the request and either getGoatPoints or
          // will get nothing and return -1
          //console.log("send request");
          request(options, function (error, response, body) {
            if (error) {
              console.log(error.message);
            } else {
              //console.log(response);
              var aid = response["body"]["aid"];
              var firstname = response["body"]["firstname"];
              var lastname = response["body"]["lastname"];
              var address = response["body"]["address"];
              var city = response["body"]["city"];
              var zip = response["body"]["zip"];
              var email = response["body"]["email"];
              var phonenumber = response["body"]["phonenumber"];
              var username = response["body"]["username"];
              res.render('user_dashboard-edit_info', {
                "title": 'Sprout Creek Farm User Dashboard',
                "page": 'login',
                "aid": aid,
                "firstname": firstname,
                "lastname": lastname,
                "address": address,
                "city": city,
                "zip": zip,
                "email": email,
                "phonenumber": phonenumber,
                "username": username});
            }
          });
        }
      }
    });
};


module.exports = {
  sendUserDashboardEditInfoPage,
};
