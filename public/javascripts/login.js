/**
 * @module public/javascripts/login.js
 * @fileoverview Front-end code in case interactivity or any JavaScript-related
 *    functionalities are required.
 * @exports {null} No front-end code exported to back-end.
 */

 /**
  * @function login
  * @description Takes in a cookie and compares it to database values to
  *    determine if it is valid or not.
  * @param None
  */
function login() {

  // get username and password and make sure its filled in
  user = document.getElementById("username").value;
  pass = document.getElementById("password").value;
  if (user == "" || password == "") {
    alert("YOU MUST ENTER A USERNAME OR PASSWORD");
    return;
  }

  // setup json for api
  var json = JSON.stringify({
    "username" : user,
    "password" : pass
  });

  // make the api call
  fetch("/api/login",
    {method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body : json
    })
    .then(function(response) {
      if (response.status !== 200) {
        alert("Login failed. Try again.");
        return
      } else {
        // send to a webpage
        response.text().then(function(data) {
          window.location.href = window.location.origin + data;
        });
        return;
      }
    });
}
