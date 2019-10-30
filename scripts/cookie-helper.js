
// This helper file makes a cleaner reading of a credientials file for
// hidden information like DB credientials
var hidden = require('./read-hidden.js');

// checks to see if a cookie is valid
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
          if (err_0) {
            con.end();
            console.log(err_0);
            resolve(null);
          } else if (result_0.length > 0) {
            // cookie has been inactive for 30 mins
            if (new Date(result_0[0]["CURRENT_TIMESTAMP"]) - new Date(cookie["last_seen"]) > 1800000) {
              console.log("INVALID");
              con.end();
              resolve(null);
            }

            // this is to see if cookieID is real and get corrresponding aid
            statement = ("SELECT accountID FROM cookies WHERE cookieID='"
                + cookie["cookieId"] + "' AND last_seen='"
                + cookie["last_seen"] + "'");

            // run the statement on the db
            con.query(statement, function(err, result) {
              if (err) {
                con.end();
                console.log(err);
                resolve(null);
              } else if (result.length > 0) {
                var aid = result[0]["accountID"];
                // validate the data of the cookie
                statement_1 = ("SELECT isAdmin FROM account "
                    + "where aid='" + aid + "' AND "
                    + "username='" + cookie["username"] + "' AND "
                    + "email='" + cookie["email"] + "'");
                // run the statement on the db
                con.query(statement, function(err_1, result_1) {
                  if (err_1) {
                    console.log(err_1);
                    con.end();
                    resolve(null);
                  } else if (result_1.length > 0) {
                    // validate creds from cookie
                    con.end();
                    resolve(updateCookie(cookie, aid));
                  } else {
                    con.end();
                    resolve(null);
                  }
                });
              // invalid cookie
              } else {
                con.end();
                resolve(null);
              }
            });
          } else {
            con.end();
            resolve(null);
          }
        })
      });
  })
}

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
        statement = ("SELECT aid FROM account WHERE "
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
            con.end();
            resolve(null);
          }
        });
      });
  });
}

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

        statement_1 = ("UPDATE cookies "
            + "set last_seen=CURRENT_TIMESTAMP "
            + "where cookieID='" + cookie["cookieId"] + "'");
        con.query(statement_1, function(err_1, result_1) {
          if (err_1) {
            console.log(err_1);
            con.end();
            resolve(null);
          } else {
            // getting the cookieId so it can be referenced in the future
            statement_2 = ("SELECT cookieID, last_seen FROM cookies "
                + "WHERE accountID='" + aid + "'");
            con.query(statement_2, function(err_2, result_2) {
              if (err_2) {
                console.log(err_2);
                con.end();
                resolve(null);
              } else {
                var new_cookie = {"cookieId": result_2[0]["cookieID"],
                                  "email": cookie["email"],
                                  "username": cookie["username"],
                                  "isAdmin": cookie["isAdmin"],
                                  "last_seen": result_2[0]["last_seen"]
                            };
                con.end();
                resolve(new_cookie);
              }
          });
        }
      });
    });
  })
}

// handles everything to do with a cookie
exports.handleLoginCookie = function(cookie, user_info) {
  return new Promise(function(resolve, reject) {
    // while server is down
    var new_cookie = {"cookieId": 1,
                      "email": "tempemail",
                      "username": "nan",
                      "isAdmin": 1,
                      "last_seen": "yes!"
                };
    resolve(new_cookie);
    if (cookie == "undefined" || cookie == null) {
      cookie = null;
    } else if (cookie["CID"] == "undefined" || cookie["CID"] == null) {
      cookie = null;
    }

    // cookie exists check if valid
    if (cookie != null) {
      // check if it is a valid cookie
      resolve(checkCookie(cookie["CIS"], user_info));
      // create a cookie
    } else {
      resolve(createCookie(user_info));
    }
  });
}

exports.handleCreateAccountCookie = function(user_info) {
  return new Promise(function(resolve, reject) {
    // while server is down
    var new_cookie = {"cookieId": 1,
                      "email": "tempemail",
                      "username": "nan",
                      "isAdmin": 1,
                      "last_seen": "yes!"
                };
    resolve(new_cookie);
    resolve(createCookie(user_info));
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

// TEMP
    // while server is down for testing
    var new_cookie = {"cookieId": 1,
                      "email": "tempemail",
                      "username": "nan",
                      "isAdmin": 1,
                      "last_seen": "yes!"
                };
    resolve(new_cookie);
// END TEMP

    // check if a cokie is present
    try {
      // no cookies exist at all
      if (cookie == null || cookie == "undefined") {
        resolve(null);
      // cookie for CID doesnt exists but other may exist
      } else if (cookie["CID"] == null || cookie["CID"] == "undefined") {
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
