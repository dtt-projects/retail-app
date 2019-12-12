/**
 * @module scripts/session-helper.js
 * @fileoverview A helper file for handling sessions on the webserver
 * @exports handleSessionDeleteSession
 * @exports handleSessionUpdateValues
 * @exports handleSessionGetSessionInfo
 * @exports handleSessionGetCart
 * @exports handleSessionUpdateCart
 * @exports handleSessionSetCartItem
 * @exports handleSessionIsAdmin
 * @exports handleSessionIsLoggedIn
 * @exports printSessions
 * @require read-hidden
 * @require app
 * @require uuid/v4
 */

// This helper file makes a cleaner reading of a credientials file for
// hidden information like DB credientials
const hidden = require('./read-hidden.js');

// this will get the session object from app.js
// doing this allows for one session list once the webserver starts
const sessions = require('../app.js');

// this is for the uuid's between both the webserver and the user's cookies
const uuidv4 = require('uuid/v4');

// 30 minutes
// this is the timeout value of sessions on the system
const TIMEOUT = 1800000;


/**
 * @function handleSessionDeleteSession
 * @description This will delete an existing session from the webserver
 * @param sessionId the session that will be deleted
 * @return true or false depending on if it was sucessful or not
 */
exports.handleSessionDeleteSession = function(sessionId) {
  return new Promise(function(resolve, reject) {
    for(var i = 0; i < sessions["sessions"].length; i++) {
      // found the user's session and delete it
      if (sessions["sessions"][i]["uuid"] == sessionId) {
        delete sessions["sessions"][i];
        // filters out the deleted sessions
        sessions["sessions"] = sessions["sessions"].filter(n => n);
        resolve(true);
        return;
      // reached end of sessions so it must have already been deleted
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
 * @return true or false dpepending if it was sucessful or not
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
 * @description This will get the session's corresponding account ID
 * @param sessionId the session that will be used
 * @return the session's linked aid if not found then returns null
 */
exports.handleSessionGetSessionInfo = function(sessionId) {
  return new Promise(function(resolve, reject) {
    for(var i = 0; i < sessions["sessions"].length; i++) {
      // found the user's session and return aid
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
 * @function handleSessionGetCart
 * @description This will get the session's current cart
 * @param sessionId the session that will have the items pulled
 * @return the cart currently being held within the session
 */
exports.handleSessionGetCart = function(sessionId) {
  return new Promise(function(resolve, reject) {
    var sessionList = sessions["sessions"];
    for (var i = 0; i < sessionList.length; i++) {
      // found the user's session and sends back cart
      if (sessionList[i]["uuid"] == sessionId) {
        resolve(sessionList[i]["cart"]);
        return;
      // reached end of sessions so send back empty cart
      } else if (sessionList.length - 1 == i) {
        emptyCart = {}
        resolve(emptyCart);
        return
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
 * @return true or false depending if the operation was sucessful or not
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
 * @function handleSessionSetCartItem
 * @description This will set an item in cart with a particular amount
 * @param sessionId the session that will have the items added
 * @param itemId the corresponding item id from the ibm db
 * @param amount the amount of that item being added
 * @return true or false depending if the operation was sucessful or not
 */
exports.handleSessionSetCartItem = function (sessionId, itemId, amount) {
  return new Promise(function(resolve, reject) {
    var sessionList = sessions["sessions"];
    for (var i = 0; i < sessionList.length; i++) {
      // found the user's session and update the cart amount
      if (sessionList[i]["uuid"] == sessionId) {
        sessionList[i]["cart"][itemId.toString()] = amount;
        resolve(true);
      // reached end of sessions
      } else if (sessionList.length - 1 == i) {
        resolve(false);
      }
    }
  });
};


/**
 * @function handleSessionIsAdmin
 * @description This will check if the session is an admin's session
 * @param sessionId the session that will be checked
 * @return if a user is an admin will return true else return false
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
 * @description This will check if the session is logged in
 * @param sessionId the session that will be checked
 * @return true if the session is logged into false if it isnt
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
 * @function handleSession
 * @description This will check if the session is valid for if the session is
 *    invalid it will delete it and make a new one
 * @param userCookie the cookie from the user
 * @return it will send back the uuid linked to the session on the webserver
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
        for(var i = 0; i < sessions["sessions"].length; i++) {
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
          // delete a timeouted session
          } else if (Date.now() - sessions["sessions"][i]["currentTime"] > TIMEOUT) {
            delete sessions["sessions"][i];
          } else if (sessions["sessions"][i]["uuid"] == userCookie["sessionId"]) {
            // check for timeout
            sessions["sessions"][i]["currentTime"] = Date.now();
            resolve(userCookie["sessionId"]);
          // end of sessions user's session must have been deleted
          // end of sessions and was not found so building a new session
          } else if (i == sessions["sessions"].length - 1) {
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
    // broken sessions
    } catch(e) {
      console.log(":(")
      console.log(e);
      resolve(null);
    }
  });
}


// DEBUGGING FOR sessions
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
