function login() {
  user = document.getElementById("username").value;
  pass = document.getElementById("password").value;

  if (user == "" || password == "") {
    alert("YOU MUST ENTER A USERNAME OR PASSWORD");
    return;
  }
  var json = JSON.stringify({
    "username" : user,
    "password" : pass
  });

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
      response.text().then(function(data) {
        console.log(data);
      });
    });
}
