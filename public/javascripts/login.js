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
    {method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body : json
    })
    .then(function(response) {
      if (response.status !== 200) {
        console.log("Problem with ajax call! " + response.status
            + " msg: " + response.value);
        return
      }
      // send to a webpage
      response.text().then(function(data) {
        window.location.href(data);
      });
    });
}
