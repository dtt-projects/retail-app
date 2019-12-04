/**
 * @module routes/controllers/adminDashboardManageInventorySubInventoryPage
 * @fileoverview adminDashboardManageInventorySubInventoryPage route's controller. Exports
 *    functions to be used by each route handler.
 * @exports {Object} Functions to attach to the `adminDashboardManageInventorySubInventoryPage` router.
 * @require session-helper
 * @require request
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

 const request = require('request');

/**
 * @function sendAdminDashboardManageInventorySubInventoryPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendAdminDashboardManageInventorySubInventoryPage = (req, res, next) => {
  // check their session and update it
  sessions.handleSession(req.cookies)
    .then(sessionId => {
      res.cookie("sessionId", sessionId);
      sessions.handleSessionIsLoggedIn(sessionId)
        .then(isLoggedIn => {
          // user is logged in check if admin or normal user
          if (isLoggedIn) {
            sessions.handleSessionIsAdmin(sessionId)
              .then(isAdmin => {
                // user is an admin
                if (isAdmin) {
                  var itemNum = req.baseUrl.split("/")[4];
                  // setup url for api call
                  var options ={
                    method: 'GET',
                    url: 'http://' + req.headers["host"] + '/api/getItem/' + itemNum,
                  };
                  // make the request to get a single item from IBM DB
                  // if error send user back to root admin Inventory page
                  // if sucess populate the item page
                  request(options, function (error, response, body) {
                    if (error) {
                      console.log(error.message);
                      res.redirect('/admin_dashboard/manage_inventory');
                    } else {
                      //itemsList = JSON.parse(body.toString())
                      var data = JSON.parse(body.toString())[0];
                      console.log(data);
                      res.render('admin_dashboard-manage_inventory-sub_inventory', {
                        title: 'Sprout Creek Farm Admin Dashboard | Sub Inventory',
                        page: 'login',
                        "item": data,
                        "isDashboard": true});
                    }
                  });
                // user is not an admin
                } else {
                  res.redirect("/user_dashboard");
                }
              })
          // user isnt logged in render login page
          } else {
            res.redirect("/login");
          }
        })
    });
};


module.exports = {
  sendAdminDashboardManageInventorySubInventoryPage,
};
