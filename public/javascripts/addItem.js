function addItem() {

  // get item information
  itemId = document.getElementById("itemId").value;
  merchantId = document.getElementById("merchantId").value;
  name = document.getElementById("name").value;
  cat = document.getElementById("cat").value;
  desc = document.getElementById("desc").value;
  imageLink = document.getElementById("imageLink").value;
  price = document.getElementById("price").value;
  quantity = document.getElementById("quantity").value;

  console.log(json);

  // add to inventory
  if (itemId != "") {
    var json = JSON.stringify({
      "itemId" : itemId,
      "merchantId" : merchantId,
      "name" : name,
      "cat": cat,
      "desc": desc,
      "imageLink": imageLink,
      "price": price,
      "quantity": quantity
    });
    // make the api call
    fetch("/api/updateItem",
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
          alert(data);
        });
      });

  // update an existing item
  } else {
    var json = JSON.stringify({
      "merchantId" : merchantId,
      "name" : name,
      "cat": cat,
      "desc": desc,
      "imageLink": imageLink,
      "price": price,
      "quantity": quantity
    });
    // make the api call
    fetch("/api/addItem",
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
          alert(data);
        });
      });
  }
  return;

}
