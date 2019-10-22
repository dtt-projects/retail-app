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
          database: json[0]["database"]
        });
        con.connect(function(err) {
          if (err) {
            throw err;
          }
        });

        // break down the cookie data for readability
        cookie_data = cookie["CID"];

        // this is to see if cookieID is real and get corrresponding aid
        statement = ("SELECT accountID FROM cookies where cookieID='"
            + cookie_data["cookieId"] + "'");

        // run the statement on the db
        con.query(statement, function(err, result) {
          if (err) {
            throw err;
          } else {
            if (result.length > 0) {
              var aid = result[0]["accountID"];

              // validate the data of the cookie
              statement_1 = ("SELECT isAdmin FROM account "
                  + "where aid='" + aid + "' AND "
                  + "username='" + cookie_data["username"] + "' AND "
                  + "email='" + cookie_data["email"] + "'");

              // run the statement on the db
              con.query(statement, function(err_1, result_1) {
                if (err_1) {
                  throw err_1;
                } else {
                  // validate creds from cookie
                  if (result_1.length > 0) {
                    resolve(updateCookie(cookie));
                  } else {
                    resolve(null);
                  }
                }
              });
            // invalid cookie
            } else {
              resolve(null);
            }
          }
        });
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
          database: json[0]["database"]
        });
        con.connect(function(err) {
          if (err) {
            throw err;
          }
        });
        console.log("user_info: " + user_info);
        // prepare to link account and cookie tables
        statement = ("SELECT aid FROM account WHERE "
            + "username='" + user_info["username"] + "'"
            + "AND email='" + user_info["email"] + "'");
        con.query(statement, function(err, result) {
          if (err) {
            throw err;
          } else if (result.length > 0) {
            // setting a cookie in the database
            console.log("AID: " + result[0]["aid"])
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
            console.log("Error in cookies");
            reject(null);
          }
        });
      });
  });
}

function updateCookie(cookie) {
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

      statement = ("UPDATE cookies "
          + "set last_seen=CURRENT_TIMESTAMP "
          + "where cookieID='" + cookie["CookieId"] + "'");
      con.query(statement, function(err, result) {
        if (err) {
          throw err;
        }
      });
    });
}

// handles everything to do with a cookie
exports.handleCookie = function(cookie, user_info) {
  return new Promise(function(resolve, reject) {
    // get the creds from the hidden file
    console.log("in cookies function");
    hidden.readHidden()
      .then(json => {
        var mysql = require("mysql");
        console.log("COOKIES JSON: " + json);
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

        // cookie exists check if valid
        if (cookie != null) {
          // check if it is a valid cookie
          resolve(checkCookie(cookie));
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


/*



  // get username and password to comprare to
  statement = ("insert into cookies "
      + "(accountID, last_seen) "
      + "VALUES('" + user_info["aid"]
          + "', CURRENT_TIMESTAMP)");
  con.query(statement, function(err, result) {
    if (err) {
      res.setHeader('Content-Type', 'plain/text');
      res.send("/login");
      throw err;
    }

    */
