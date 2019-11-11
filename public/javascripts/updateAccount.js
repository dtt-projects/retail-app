function updateAccount() {
  // Read the form data and set its values
  var aid = document.getElementById("aid").value;
  var first_name = document.getElementById("first_name").value;
  var last_name = document.getElementById("last_name").value;
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var zip = document.getElementById("zip").value;
  var phone_number = document.getElementById("phone_number").value;
  var password = document.getElementById("password").value;

  // convert into json for api
  var json = JSON.stringify({
    "aid": aid,
    "first_name": first_name,
    "last_name": last_name,
    "address": address,
    "city": city,
    "zip": zip,
    "phone_number": phone_number,
    "password": password
  });

  // send to the update account api
  fetch("/api/updateAccount",
    {method: "PUT",
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
      // reload the page after new input
      response.text().then(function(data) {
        location.reload(true);
      });
    });
}
