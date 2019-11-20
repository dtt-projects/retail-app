/**
 * @module scripts/session-helper.js
 * @fileoverview A helper file for handling sessions on the webserver
 * @exports handleSessionIsAdmin
 * @exports handleSessionIsLoggedIn
 * @exports handleSessionUpdateCart
 * @exports handleSessionUpdateValues
 * @exports handleSessionGetSessionInfo
 * @require read-hidden
 * @require www
 * @require uuid/v4
 */

// This helper file makes a cleaner reading of a credientials file for
// hidden information like DB credientials
const hidden = require('./read-hidden.js');
//const sessions = require('../bin/www');
const sessions = require('../app.js');
const uuidv4 = require('uuid/v4');
const TIMEOUT = 1800000;

/**
 * @function handleSessionDeleteSession
 * @description This will update an existing sesison with user creds
 * @param sessionId the session that will be modified
 */
exports.handleSessionDeleteSession = function(sessionId) {
  return new Promise(function(resolve, reject) {
    for(var i = 0; i < sessions["sessions"].length; i++) {
      // found the user's session and updated it
      if (sessions["sessions"][i]["uuid"] == sessionId) {
        delete sessions["sessions"][i];
        sessions["sessions"] = sessions["sessions"].filter(n => n);
        resolve(true);
        return;
      // reached end of sessions
      } else if (sessions["sessions"].length - 1 == i) {
        resolve(false);
        return;
      }
    }
  })
}
/**
 * @function handleSessionUpdateValues
 * @description This will update an existing sesison with user creds
 * @param sessionId the session that will be modified
 * @param aid the account id from our database
 * @param adminStatus which is from our database
 */
exports.handleSessionUpdateValues = function(sessionId, aid, adminStatus) {
  return new Promise(function(resolve, reject) {
    for(var i = 0; i < sessions["sessions"].length; i++) {
      // found the user's session and updated it
      if (sessions["sessions"][i]["uuid"] == sessionId) {
        sessions["sessions"][i]["isAdmin"] = adminStatus;
        sessions["sessions"][i]["aid"] = aid;
        resolve(true);
      // reached end of sessions
      } else if (sessions["sessions"].length - 1 == i) {
      resolve(false);
      }
    }
  })
}

/**
 * @function handleSessionGetSessionInfo
 * @description This will get the session info like the corresponding account ID
 * @param sessionId the session that will be used
 */
exports.handleSessionGetSessionInfo = function(sessionId) {
  return new Promise(function(resolve, reject) {
    for(var i = 0; i < sessions["sessions"].length; i++) {
      // found the user's session and updated it
      if (sessions["sessions"][i]["uuid"] == sessionId) {
        resolve(sessions["sessions"][i]["aid"])
      // reached end of sessions
      } else if (sessions["sessions"].length - 1 == i) {
        resolve(null);
      }
    }
  })
}

/**
 * @function handleSessionUpdateCart
 * @description This will add/remove items to/from the session's cart
 * @param sessionId the session that will have the items added
 * @param itemId the corresponding item id from the ibm db
 * @param amount the amount of that item being added
 * @param isAdding if the item is being added or removed from the cart
 */
exports.handleSessionUpdateCart = function(sessionId, itemId, amount, isAdding) {
  return new Promise(function(resolve, reject) {
    var sessionList = sessions["sessions"];
    for (var i = 0; i < sessionList.length; i++) {
      // found the user's session and updated it
      if (sessionList[i]["uuid"] == sessionId) {
        if (isAdding) {
          // adding more
          if (sessionList[i]["cart"][itemId.toString()] != null) {
            sessionList[i]["cart"][itemId.toString()] += amount;
            resolve(true);
            return;
          // first time adding
          } else {
            sessionList[i]["cart"][itemId.toString()] = amount;
            resolve(true);
            return;
          }
        } else {
          // removing
          if (sessionList[i]["cart"][itemId.toString()] != null) {
            if (sessionList[i]["cart"][itemId.toString()] > amount) {
              sessionList[i]["cart"][itemId.toString()] -= amount;
              resolve(true);
              return;
            } else {
              delete sessionList[i]["cart"][itemId.toString()]
              resolve(true);
              return;
            }
          } else {
            resolve(false);
            return;
          }
        }
      // reached end of sessions
      } else if (sessionList.length - 1 == i) {
      resolve(false);
      }
    }
  })
}


/**
 * @function handleSessionIsAdmin
 * @description This will check if the session is an admin's session
 * @param sessionId the session that will be checked
 */
exports.handleSessionIsAdmin = function(sessionId) {
  return new Promise(function(resolve, reject) {
    for(var i = 0; i < sessions["sessions"].length; i++) {
      if (sessions["sessions"][i]["uuid"] == sessionId) {
        resolve(sessions["sessions"][i]["isAdmin"] == "1");
      } else if (sessions["sessions"].length - 1 == i) {
        resolve(false);
      }
    }
  });
}


/**
 * @function handleSessionIsLoggedIn
 * @description This will check if the session is an admin's session
 * @param sessionId the session that will be checked
 */
exports.handleSessionIsLoggedIn = function(sessionId) {
  return new Promise(function(resolve, reject) {
    try {
      for(var i = 0; i < sessions["sessions"].length; i++) {
        if (sessions["sessions"][i]["uuid"] == sessionId) {
          resolve(sessions["sessions"][i]["isAdmin"] != null);
        }
      }
    } catch(e) {
      console.log("Error with session login");
      resolve(false);
    }
  });
}


/**
 * @function printSessions
 * @description This is used to debug sessions
 */
exports.printSessions = function() {
  //console.log(sessions);
  for(var i = 0; i < sessions["sessions"].length; i++) {
    console.log(sessions["sessions"][i]);
    console.log("\t" + sessions["sessions"][i]["cart"]);
  }
}

/**
 * @function handleSession
 * @description This will check if the session is valid for if the session is
 *    invalid it will delete it and make a new one
 * @param userCookie the cookie from the user
 */
exports.handleSession = function(userCookie) {
  return new Promise(function(resolve, reject) {
    try {
      // no cookie
      sessions["sessions"] = sessions["sessions"].filter(n => n);
      if (userCookie["sessionId"] == null || sessions["sessions"].length == 0) {
        //console.log('new user');
        var currentTime = Date.now();
        var uuid = uuidv4();
        sessionData = {
          "uuid": uuid,
          "currentTime": currentTime,
          "isAdmin": null,
          "aid": "",
          "cart": {}
        }
        sessions["sessions"].push(sessionData);
        resolve(uuid);
      // look for uuid in the sessions
      } else {
        //console.log("start for each")
        //console.log(sessions);
        for(var i = 0; i < sessions["sessions"].length; i++) {
          //console.log(sessionData);
          // old session and last session
          if (Date.now() - sessions["sessions"][i]["currentTime"] > TIMEOUT && sessions["sessions"].length == 1) {
            var currentTime = Date.now();
            var uuid = uuidv4();
            sessionData = {
              "uuid": uuid,
              "currentTime": currentTime,
              "isAdmin": null,
              "aid": "",
              "cart": {}
            }
            // push new session into list
            sessions["sessions"].push(sessionData);

            // remove the bad session
            delete sessions["sessions"][i];
            //console.log('new user');
            resolve(uuid);
            return;
          } else if (Date.now() - sessions["sessions"][i]["currentTime"] > TIMEOUT) {
            //console.log("deleting");
            //console.log(sessionData);
            delete sessions["sessions"][i];
          } else if (sessions["sessions"][i]["uuid"] == userCookie["sessionId"]) {
            //console.log("found session!");
            // check for timeout
            sessions["sessions"][i]["currentTime"] = Date.now();
            resolve(userCookie["sessionId"]);
          // end of sessions user's session must have been deleted
          } else if (i == sessions["sessions"].length - 1) {
            //console.log('user session was deleted');
            var currentTime = Date.now();
            var uuid = uuidv4();
            sessionData = {
              "uuid": uuid,
              "currentTime": currentTime,
              "isAdmin": null,
              "aid": "",
              "cart": {}
            }
            sessions["sessions"].push(sessionData);
            resolve(uuid);
            return;
          }
        }
      }
    return;
    } catch(e) {
      console.log(":(")
      console.log(e);
    }
  });
}
