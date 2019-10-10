function createAccount() {
  var first_name = document.getElementById("first_name").value;
  var last_name = document.getElementById("last_name").value;
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var zip = document.getElementById("zip").value;
  var email = document.getElementById("email").value;
  var phone_number = document.getElementById("phone_number").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  /*
  if (email == "") {
    alert("YOU MUST ENTER AN Email");
    return;
  }
  */


  var json = JSON.stringify({
    "first_name": first_name,
    "last_name": last_name,
    "address": address,
    "city": city,
    "zip": zip,
    "email": email,
    "phone_number": phone_number,
    "username": username,
    "password": password
  });
  console.log(json);
  fetch("/api/create_account",
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
