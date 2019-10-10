function forgotPassword() {
  var email = document.getElementById("email").value;

  if (email == "") {
    alert("YOU MUST ENTER AN Email");
    return;
  }

  document.getElementById("response").innerHTML = "If that email exists in our"
      + " system a reset password email has been sent."

  var json = JSON.stringify({
    "email" : email
  });

  fetch("/api/forgot_password",
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
