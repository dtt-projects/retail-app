var hidden = require('./read-hidden.js');

/*
1.8m
1,800,000
*/

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
            con.close();
            console.log(err_0);
            resolve(null);
          } else if (result_0.length > 0) {
            // cookie has been inactive for 30 mins
            if (new Date(result_0[0]["CURRENT_TIMESTAMP"]) - new Date(cookie["last_seen"]) > 1800000) {
              console.log("INVALID");
              con.close();
              resolve(null);
            }

            // this is to see if cookieID is real and get corrresponding aid
            statement = ("SELECT accountID FROM cookies WHERE cookieID='"
                + cookie["cookieId"] + "' AND last_seen='"
                + cookie["last_seen"] + "'");

            // run the statement on the db
            con.query(statement, function(err, result) {
              if (err) {
                con.close();
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
                    con.close();
                    resolve(null);
                  } else if (result_1.length > 0) {
                    // validate creds from cookie
                    con.close();
                    resolve(updateCookie(cookie, aid));
                  } else {
                    con.close();
                    resolve(null);
                  }
                });
              // invalid cookie
              } else {
                con.close();
                resolve(null);
              }
            });
          } else {
            con.close();
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
            throw err;
          }
        });
        // prepare to link account and cookie tables
        statement = ("SELECT aid FROM account WHERE "
            + "username='" + user_info["username"] + "'"
            + "AND email='" + user_info["email"] + "'");
        con.query(statement, function(err, result) {
          if (err) {
            throw err;
          } else if (result.length > 0) {
            // setting a cookie in the database
            var aid = result[0]["aid"];
            // look to see if cookie already exist for that aid
            statement_1 = ("SELECT cookieID FROM cookies WHERE "
                + "accountID='" + aid + "'");
            con.query(statement_1, function(err_1, result_1) {
              if (err_1) {
                throw err_1;
              // cookie has been made in the past and must update timestamp
              } else if (result_1.length > 0) {
                statement_2 = ("UPDATE cookies SET last_seen=CURRENT_TIMESTAMP"
                    + " WHERE accountID='" + aid + "'");
                con.query(statement_2, function(err_2, result_2) {
                  if (err_2) {
                    throw err_2;
                  // ge updated cookie and send it to the user
                  } else {
                    // getting the cookieId so it can be referenced in the future
                    statement_3 = ("SELECT cookieID, last_seen FROM cookies "
                        + "WHERE accountID='" + aid + "'");
                    con.query(statement_3, function(err_3, result_3) {
                      if (err_3) {
                        throw err_3;
                      } else {
                        var cookie = {"cookieId": result_3[0]["cookieID"],
                                      "email": user_info["email"],
                                      "username": user_info["username"],
                                      "isAdmin": user_info["isAdmin"],
                                      "last_seen": result_3[0]["last_seen"]
                                    };
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
                    throw err_2;
                  } else {
                    // getting the cookieId so it can be referenced in the future
                    statement_3 = ("SELECT cookieID, last_seen FROM cookies WHERE "
                        + "accountID='" + aid + "'");
                    con.query(statement_3, function(err_3, result_3) {
                      if (err_3) {
                        throw err_3;
                      } else {
                        var cookie = {"CookieId": result_3[0]["cookieID"],
                                      "email": user_info["email"],
                                      "username": user_info["username"],
                                      "isAdmin": user_info["isAdmin"],
                                      "last_seen": result_3[0]["last_seen"]
                                    };
                        resolve(cookie);
                      }
                    });
                  }
                });
              }
            })
          } else {
            reject(null);
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
            throw err;
          }
        });

        statement_1 = ("UPDATE cookies "
            + "set last_seen=CURRENT_TIMESTAMP "
            + "where cookieID='" + cookie["cookieId"] + "'");
        con.query(statement_1, function(err_1, result_1) {
          if (err_1) {
            throw err_1;
          } else {
            // getting the cookieId so it can be referenced in the future
            statement_2 = ("SELECT cookieID, last_seen FROM cookies "
                + "WHERE accountID='" + aid + "'");
            con.query(statement_2, function(err_2, result_2) {
              if (err_2) {
                throw err_2;
              } else {
                var new_cookie = {"cookieId": result_2[0]["cookieID"],
                                  "email": cookie["email"],
                                  "username": cookie["username"],
                                  "isAdmin": cookie["isAdmin"],
                                  "last_seen": result_2[0]["last_seen"]
                            };
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
    // get the creds from the hidden file
    hidden.readHidden()
      .then(json => {
        var mysql = require("mysql");
        // connect to the database
        var con = mysql.createConnection({
          host: json[0]["host"],
          user: json[0]["user"],
          password: json[0]["password"],
          database: json[0]["database"]
        });
        con.connect(function(err) {
          if (err) {
            throw err;
          }
        });

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
      })
      .catch(error => {
        console.log(error);
        reject(error);
      })
    });
}

exports.handleCreateAccountCookie = function(user_info) {
  return new Promise(function(resolve, reject) {
    resolve(createCookie(user_info));
  });
}

exports.handleNormalPageCookie = function(cookie) {
  return new Promise(function(resolve, reject) {
    // no cookie present so no need to make one
    try {
      console.log(cookie);
      if (cookie == null || cookie == "undefined") {
        resolve(null);
      } else if (cookie["CID"] == null || cookie["CID"] == "undefined") {
        resolve(null);
      // check to see if cookie is valid
      } else {
        resolve(checkCookie(cookie["CID"]));
      }
    } catch (e) {
      resolve(null);
    }
  });
}
