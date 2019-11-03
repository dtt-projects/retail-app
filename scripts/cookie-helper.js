/**
 * @module scripts/cookie-helper.js
 * @fileoverview A helper file for handling cookies
 * @exports handleLoginCookie handles cookies for logging in
 * @exports handleCreateAccountCookie handles cookies for new accounts
 * @exports handleNormalPageCookie handles cookies for all other pages
 */

// This helper file makes a cleaner reading of a credientials file for
// hidden information like DB credientials
var hidden = require('./read-hidden.js');

/**
 * @function checkCookie
 * @description Takes in a cookie and compares it to database values to
 *    determine if it is valid or not.
 * @param cookie the cookie that is being checked
 */
function checkCookie(cookie) {
  return new Promise(function(resolve, reject) {
    // get the creds from the hidden file
    hidden.readHidden()
      .then(json => {
        var mysql = require("mysql");
        // connect to the database
        var con = mysql.createConnection({
          host: json[0]["host"],
          user: json[0]["user"],
          password: json[0]["password"],
          database: json[0]["database"],
          dateStrings: true
        });
        con.connect(function(err) {
          if (err) {
            console.log(err);
            resolve(null);
          }
        });

        statement_0 = ("SELECT CURRENT_TIMESTAMP");
        con.query(statement_0, function(err_0, result_0) {
          // value on getting timestamp so return a null for cookie
          if (err_0) {
            // close db connection and send error to console
            con.end();
            console.log(err_0);
            resolve(null);
          // timestamp from db and will be used for comparing for timeout
          } else if (result_0.length > 0) {
            // cookie has been inactive for 30 mins
            var thirtyMins = 1800000;
            if (new Date(result_0[0]["CURRENT_TIMESTAMP"])
                - new Date(cookie["last_seen"]) > thirtyMins) {
              // log cookie timeout, close connection, and send null for cookie
              console.log("Cookie Timeout!");
              con.end();
              resolve(null);
            // within 30 mins of activity so check it is a valid cookie
            } else {
              // this is to see if cookieID is real and get corrresponding aid
              statement = ("SELECT accountID FROM cookies WHERE cookieID='"
                  + cookie["cookieId"] + "' AND last_seen='"
                  + cookie["last_seen"] + "'");

              // run the statement on the db
              con.query(statement, function(err, result) {
                // error so end connection, log it, and send null for cookie
                if (err) {
                  con.end();
                  console.log(err);
                  resolve(null);
                // we got results so the statement was valid
                } else if (result.length > 0) {
                  var aid = result[0]["accountID"];
                  // validate the rest of the data from the cookie
                  statement_1 = ("SELECT isAdmin FROM accounts "
                      + "where aid='" + aid + "' AND "
                      + "username='" + cookie["username"] + "' AND "
                      + "email='" + cookie["email"] + "'");
                  // run the statement on the db
                  con.query(statement, function(err_1, result_1) {
                    // we got an error so end conection, log it, and send back
                    // null for the cookie
                    if (err_1) {
                      console.log(err_1);
                      con.end();
                      resolve(null);
                    // we got back valid results from the db
                    } else if (result_1.length > 0) {
                      // validate creds from cookie so we end connection
                      con.end();
                      // now we will update the value of the cookie
                      resolve(updateCookie(cookie, aid));
                    // it didnt match up with the rest of the cookie database
                    // so we will log it, end connection and send back null
                    } else {
                      console.log("INVALID Cookie: full check!")
                      con.end();
                      resolve(null);
                    }
                  });
                // cookie id and timestamp pair didnt exist so its invalid
                // send back null because of invalid cookie
                } else {
                  con.end();
                  console.log("INVALID Cookie: cid and last_seen invalid!")
                  resolve(null);
                }
              });
            }
          }
        })
      });
  })
}

/**
 * @function createCookie
 * @description Takes in a cookie and compares it to database values to
 *    determine if it is valid or not.
 * @param user_info the cookie that is being checked
 */
function createCookie(user_info) {
  return new Promise(function(resolve, reject) {
    // get the creds from the hidden file
    hidden.readHidden()
      .then(json => {
        var mysql = require("mysql");

        // connect to the database
        var con = mysql.createConnection({
          host: json[0]["host"],
          user: json[0]["user"],
          password: json[0]["password"],
          database: json[0]["database"],
          dateStrings: true
        });
        con.connect(function(err) {
          if (err) {
            console.log(err);
            resolve(null);
          }
        });
        // prepare to link account and cookie tables
        statement = ("SELECT aid FROM accounts WHERE "
            + "username='" + user_info["username"] + "'"
            + "AND email='" + user_info["email"] + "'");
        con.query(statement, function(err, result) {
          if (err) {
            console.log(err);
            con.end();
            resolve(null);
          } else if (result.length > 0) {
            // setting a cookie in the database
            var aid = result[0]["aid"];
            // look to see if cookie already exist for that aid
            statement_1 = ("SELECT cookieID FROM cookies WHERE "
                + "accountID='" + aid + "'");
            con.query(statement_1, function(err_1, result_1) {
              if (err_1) {
                console.log(err_1);
                con.end();
                resolve(null);
              // cookie has been made in the past and must update timestamp
              } else if (result_1.length > 0) {
                statement_2 = ("UPDATE cookies SET last_seen=CURRENT_TIMESTAMP"
                    + " WHERE accountID='" + aid + "'");
                con.query(statement_2, function(err_2, result_2) {
                  if (err_2) {
                    console.log(err_2);
                    con.end();
                    resolve(null);
                  // ge updated cookie and send it to the user
                  } else {
                    // getting the cookieId so it can be referenced in the future
                    statement_3 = ("SELECT cookieID, last_seen FROM cookies "
                        + "WHERE accountID='" + aid + "'");
                    con.query(statement_3, function(err_3, result_3) {
                      if (err_3) {
                        console.log(err_3);
                        con.end();
                        resolve(null);
                      } else {
                        var cookie = {"cookieId": result_3[0]["cookieID"],
                                      "email": user_info["email"],
                                      "username": user_info["username"],
                                      "isAdmin": user_info["isAdmin"],
                                      "last_seen": result_3[0]["last_seen"]
                                    };
                        con.end();
                        resolve(cookie);
                      }
                    });
                  }
                });
              } else {
                statement_2 = ("INSERT INTO cookies(accountID, last_seen)"
                    + "VALUES('" + aid + "', CURRENT_TIMESTAMP)");
                con.query(statement_2, function(err_2, result_2) {
                  if (err_2) {
                    console.log(err_2);
                    con.end();
                    resolve(null);
                  } else {
                    // getting the cookieId so it can be referenced in the future
                    statement_3 = ("SELECT cookieID, last_seen FROM cookies WHERE "
                        + "accountID='" + aid + "'");
                    con.query(statement_3, function(err_3, result_3) {
                      if (err_3) {
                        console.log(err_3);
                        con.end();
                        resolve(null);
                      } else {
                        var cookie = {"CookieId": result_3[0]["cookieID"],
                                      "email": user_info["email"],
                                      "username": user_info["username"],
                                      "isAdmin": user_info["isAdmin"],
                                      "last_seen": result_3[0]["last_seen"]
                                    };
                        con.end();
                        resolve(cookie);
                      }
                    });
                  }
                });
              }
            })
          } else {
            console.log("Cookies problem with getting user information");
            con.end();
            resolve(null);
          }
        });
      });
  });
}

/**
 * @function updateCookie
 * @description Takes in a cookie and aid and updates it in the cookie table
 * @param cookie the cookie that is being checked
 * @param aid the users related accountId
 */
function updateCookie(cookie, aid) {
  return new Promise(function(resolve, reject) {
    // get the creds from the hidden file
    hidden.readHidden()
      .then(json => {
        var mysql = require("mysql");

        // connect to the database
        var con = mysql.createConnection({
          host: json[0]["host"],
          user: json[0]["user"],
          password: json[0]["password"],
          database: json[0]["database"],
          dateStrings: true
        });
        con.connect(function(err) {
          if (err) {
            console.log(err);
            resolve(null);
          }
        });

        // update the table with the latest timestamp
        statement_1 = ("UPDATE cookies "
            + "set last_seen=CURRENT_TIMESTAMP "
            + "where cookieID='" + cookie["cookieId"] + "'");
        con.query(statement_1, function(err_1, result_1) {
          // failure means log, end connection, and send back null
          if (err_1) {
            console.log(err_1);
            con.end();
            resolve(null);
          // if it doesnt error then setup the new cookie
          } else {
            // getting the cookieId so it can be referenced in the future
            statement_2 = ("SELECT cookieID, last_seen FROM cookies "
                + "WHERE accountID='" + aid + "'");
            con.query(statement_2, function(err_2, result_2) {
              // if errors then log, end conenction, and send null cookie
              if (err_2) {
                console.log(err_2);
                con.end();
                resolve(null);
              // we got a response back with information so we can continue
              } else if (result_2.length > 0) {
                var new_cookie = {"cookieId": result_2[0]["cookieID"],
                                  "email": cookie["email"],
                                  "username": cookie["username"],
                                  "isAdmin": cookie["isAdmin"],
                                  "last_seen": result_2[0]["last_seen"]
                            };
                con.end();
                resolve(new_cookie);
              // no data back so we return null
              } else {
                con.end();
                console.log("Error with getting latest cookie");
                resolve(null);
              }
          });
        }
      });
    });
  })
}

/**
 * @function handleLoginCookie
 * @description Takes in a cookie and user info to check if a login was validate
 *    if the user logs in they will get back a proper cookie
 * @param cookie the cookie that is being checked
 * @param userInfo the info submitted from the login page
 */
exports.handleLoginCookie = function(cookie, userInfo) {
  return new Promise(function(resolve, reject) {
    // check if the cookie passed in is valid or not
    try {
      if (cookie == "undefined" || cookie == null) {
        cookie = null;
      } else if (cookie["CID"] == "undefined" || cookie["CID"] == null) {
        cookie = null;
      }
    } catch(e) {
      console.log("Error with handleLoginCookie: " + e);
      // cookie was not valid so set it to null
      cookie = null;
      // cookie exists check if valid
      if (cookie != null) {
        // check if it is a valid cookie
        resolve(checkCookie(cookie["CID"], userInfo));
      // create a cookie
      } else {
        resolve(createCookie(userInfo));
      }
    }
  });
}

/**
 * @function handleCreateAccountCookie
 * @description Takes in user info and builds a new cookie out of it for the DB
 * @param userInfo what was passed in on account creation
 */
exports.handleCreateAccountCookie = function(userInfo) {
  return new Promise(function(resolve, reject) {
    resolve(createCookie(userInfo));
  });
}

/**
 * @function handleNormalPageCookie
 * @description This looks at a cookie and checks if it is valid
 *    This will return a new valid cookie(updated) or null for invalid cookies
 * @param cookie this is the cookie that will be checked
 */
exports.handleNormalPageCookie = function(cookie) {
  return new Promise(function(resolve, reject) {
    // check if a cokie is present
    try {
      // no cookies exist at all
      if (cookie == "undefined" || cookie == null) {
        resolve(null);
      // cookie for CID doesnt exists but other may exist
      } else if (cookie["CID"] == "undefined"|| cookie["CID"] == null) {
        resolve(null);
      // check to see if cookie is valid
      } else {
        resolve(checkCookie(cookie["CID"]));
      }
    // catch incase cookie doesnt exists and is null or undefined
    } catch (e) {
      console.log("Error with handleNormalCookie: " + e);
      resolve(null);
    }
  });
}
