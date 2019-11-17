function createAccount() {
  // Read the form data and set its values
  var first_name = document.getElementById("first_name").value;
  var last_name = document.getElementById("last_name").value;
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var zip = document.getElementById("zip").value;
  var email = document.getElementById("email").value;
  var phone_number = document.getElementById("phone_number").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var isAdmin = "";
  var state = document.getElementById("state").value;
  try {
    isAdmin = document.getElementById("isAdmin").value;
  } catch (e) {
    console.log(e);
  }

  // This will check for any empty inputs
  var empty_inputs = false;
  if (first_name == "") {
    empty_inputs = true;
  } else if (last_name == "") {
    empty_inputs = true;
  } else if (address == "") {
    empty_inputs = true;
  } else if (city == "") {
    empty_inputs = true;
  } else if (zip == "") {
    empty_inputs = true;
  } else if (email == "") {
    empty_inputs = true;
  } else if (phone_number == "") {
    empty_inputs = true;
  } else if (username == "") {
    empty_inputs = true;
  } else if (password == "") {
    empty_inputs = true;
  }

  // if any input is empty then don't continue and alert
  if (false) {
    alert("One or more fields are blank");
    return;
  }

  // convert into json for api
  var json = JSON.stringify({
    "first_name": first_name,
    "last_name": last_name,
    "address": address,
    "city": city,
    "zip": zip,
    "email": email,
    "phone_number": phone_number,
    "username": username,
    "password": password,
    "isAdmin": isAdmin,
    "state": state
  });

  // send to the create account api
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
        response.text().then(function(data) {
          alert(data);
          return
        });
      }
      // send to login page
      response.text().then(function(data) {
        window.location.href(data)
      });
    });
}
