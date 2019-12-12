/**
 * @module routes/controllers/checkOutPage
 * @fileoverview checkOutPage route's controller. Exports functions to be
 *    used by each route handler.
 * @exports {Object} Functions to attach to the `checkOutPage` router.
 * @require session-helper
 */

 /* sessions
  * This is to help with handling sessions to maintain cart and auth
  */
 const sessions = require('../../scripts/session-helper.js');

 const mysql = require('mysql');

 const request = require('request');

 const hidden = require('../../scripts/read-hidden.js');

/**
 * @function sendCheckOutPage
 * @description Send the base page rendered by `Handlebars.js`. Compilation
 *    of HBS templates is handled by the HBS engine.
 * @param {Object} req The request object generated by `Express`.
 * @param {Object} res The response object generated by `Express`.
 * @param {Function} next The function to call when this method is done executing
 *    and does not return or render anything (no `res` methods called).
 */
const sendCheckOutPage = (req, res, next) => {
  // updates and validates user's cookies
  sessions.handleSession(req.cookies)
    .then(sessionId => {
      res.cookie("sessionId", sessionId);
      sessions.handleSessionIsLoggedIn(sessionId)
        .then(isLoggedIn => {
          // user is logged in bring them to checkout
          if (isLoggedIn) {
            sessions.handleSessionIsAdmin(sessionId)
              .then(isAdmin => {
                if (isAdmin) {
                  res.redirect("/login");
                  return
                } else {
                  // get user info based on session
                  sessions.handleSessionGetSessionInfo(sessionId)
                    .then(aid => {
                      hidden.readHidden()
                        .then(json => {
                          console.log("DB area");
                          var con = mysql.createConnection({
                            host: json[0]["host"],
                            user: json[0]["user"],
                            password: json[0]["password"],
                            database: json[0]["database"]
                          });
                          con.connect(function(err) {
                            if (err) {
                              console.log(err);
                              res.status(400);
                              res.setHeader('Content-Type', 'plain/text');
                              res.send();
                            }
                          });

                          console.log("POST DB area");

                          statement = ("select ibmid, goatpoints from ibm join rewards on ibm.aid=rewards.aid where ibm.aid=" + aid);

                          con.query(statement, function(err, result) {
                            if (err) {
                              console.log(err);
                              res.status(400);
                              con.end();
                              res.send();
                              return;
                            // ibm u
                            } else if (result.length > 0) {
                              console.log("IBM area");
                              console.log(result);
                              console.log(result[0]);
                              console.log(result[0]["ibmid"]);
                              var ibmId = result[0]["ibmid"];
                              var goatPoints = result[0]["goatpoints"];

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
                                  console.log(body["data"]["customerList"][0]);
                                  var customerInfo = body["data"]["customerList"][0];
                                  customerInfo["phonemobile"] = customerInfo["phonemobile"].trim();
                                  customerInfo["firstname"] = customerInfo["firstname"].trim();
                                  customerInfo["address2"] = customerInfo["address2"].trim();
                                  customerInfo["gendercode"] = customerInfo["gendercode"].trim();
                                  customerInfo["address1"] = customerInfo["address1"].trim();
                                  customerInfo["postcode"] = customerInfo["postcode"].trim();
                                  customerInfo["statecode"] = customerInfo["statecode"].trim();
                                  customerInfo["lastname"] = customerInfo["lastname"].trim();
                                  customerInfo["citycode"] = customerInfo["citycode"].trim();
                                  customerInfo["emailaddres"] = customerInfo["emailaddres"].trim();
                                  customerInfo["phonehome"] = customerInfo["phonehome"].trim();


                                  // get ibm card with account
                                  var options = { method: 'GET',
                                    url: json[2]["apiUrl"] + 'Credit',
                                    qs:
                                     { CustomerId: ibmId,
                                       Prefered: 'true' },
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
                                      } else if (body["data"]["creditCardList"].length > 0) {
                                        console.log("CARD");
                                        console.log(body);
                                        var cardListLen = body["data"]["creditCardList"].length - 1;
                                        console.log(body["data"]["creditCardList"][cardListLen])
                                        var customerCard = body["data"]["creditCardList"][cardListLen];
                                        customerCard["monthExpr"] = customerCard["credexpd"].split("/")[0]
                                        customerCard["yearExpr"] = customerCard["credexpd"].split("/")[1]

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

                                                      res.render('check_out', {
                                                        "title": 'Sprout Creek Farm Check Out',
                                                        "page": 'cart',
                                                        "customerInfo": customerInfo,
                                                        "goatPoints": goatPoints,
                                                        "customerCard": customerCard,
                                                        "items": cartDisplay,
                                                        "isLogged": isLoggedIn});
                                                    }
                                                  }
                                                });
                                              })
                                            }
                                          })
                                      } else {
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

                                                      res.render('check_out', {
                                                        "title": 'Sprout Creek Farm Check Out',
                                                        "page": 'cart',
                                                        "customerInfo": customerInfo,
                                                        "goatPoints": goatPoints,
                                                        "items": cartDisplay,
                                                        "isLogged": isLoggedIn});
                                                    }
                                                  }
                                                });
                                              })
                                            }
                                          })
                                        }
                                    })
                                  }
                              });
                          }
                          })
                        })
                      })
                }
              })
              } else {
                res.redirect('/login');
                return;
          }
        })
  });
};

//This will now be available for other files
module.exports = {
  sendCheckOutPage,
};
