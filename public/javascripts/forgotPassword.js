function forgotPassword() {

  // get email field
  var email = document.getElementById("email").value;
  if (email == "") {
    alert("YOU MUST ENTER AN Email");
    return;
  }

  // setup response that is amibigious and json
  document.getElementById("response").innerHTML = "If that email exists in our"
      + " system a reset password email has been sent."
  var json = JSON.stringify({
    "email" : email
  });

  // make a request for a reset password link
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
    });
}
