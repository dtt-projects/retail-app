/**
 * @module routes/controllers/userDashboardEditInfoPage
 * @fileoverview userDashboardEditInfoPage route's controller.
 *    Exports functions to be used by each route handler.
 * @exports {Object} Functions to attach to the
 *    `userDashboardEditInfoPage` router.
 * @require session-helper
 * @require mysql
 * @require request
 */

 /* request
  * This is for calling a request from the web server
  */
 const request = require("request");

 const mysql = require('mysql');

 const hidden = require('../../scripts/read-hidden.js');

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');


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
                  res.redirect('/admin_dashboard')
                // user is not an admin
                } else {
                  sessions.handleSessionGetSessionInfo(sessionId)
                    .then(aid => {
                      // setup call for internal api call
                      var options ={
                        method: 'GET',
                        url: 'http://' + req.headers["host"] + '/api/getGoatPoints',
                        body: req.cookies,
                        json: true
                      };

                      // this sends out the request and either getGoatPoints or
                      // will get nothing and return -1
                      var goatPoints = 0;
                      request(options, function (error, response, body) {
                        if (error) {
                          console.log(error.message);
                        } else {
                          //console.log(response);
                          goatPoints = response["body"];
                          goatPoints = goatPoints["goatPoints"];

                          hidden.readHidden()
                            .then(json => {
                              // connect to the database
                              var con = mysql.createConnection({
                                host: json[0]["host"],
                                user: json[0]["user"],
                                password: json[0]["password"],
                                database: json[0]["database"]
                              });
                              con.connect(function(err) {
                                if (err) {
                                  console.log(err);
                                  res.setHeader('Content-Type', 'plain/text');
                                  res.status(400);
                                  res.send();
                                }
                              });

                              var statement = ("SELECT ibmid from ibm where aid=" + aid);
                              con.query(statement, function(err, result) {
                                if (err) {
                                  console.log(err);
                                  con.end();
                                  res.send();
                                  return;
                                } else {
                                  var ibmId = result[0]["ibmid"];
                                  con.end();
                                  var options = { method: 'GET',
                                    url: json[2]["apiUrl"] + 'Customer/' + ibmId,
                                    headers:
                                     { accept: 'application/json',
                                        'content-type': 'application/json',
                                        'x-ibm-client-secret': json[2]["ClientSecret"],
                                        'x-ibm-client-id': json[2]["ClientId"] },
                                    json: true };

                                  request(options, function (error, response, body) {
                                    if (error) {
                                      console.error('Failed: %s', error.message);
                                      con.end();
                                      res.status(401);
                                      res.send();
                                      return;
                                    } else {
                                      userInfo = body["data"]["customerList"][0];


                                      console.log("++++++++++++++++++++++++++++++++++++++");
                                      console.log(userInfo);
                                      console.log("======================================");
                                      res.render('user_dashboard-edit_info', {
                                        "title": 'Sprout Creek Farm User Dashboard',
                                        "page": 'login',
                                        "userInfo": userInfo,
                                        "goatPoints": goatPoints,
                                        "isLogged": true,
                                        "isDashboard": true
                                      });
                                    }
                                  });
                                }
                              });
                            })
                        }
                    })
                  })
                }
              });
          // user isnt logged in render login page
          } else {
            res.redirect("/login");
          }
        })
    });
};


module.exports = {
  sendUserDashboardEditInfoPage,
};
