function login() {
  user = document.getElementById("username").value;
  pass = document.getElementById("password").value;
  console.log(user);
  console.log(pass);
  if (user == "" || password == "") {
    alert("YOU MUST ENTER A USERNAME OR PASSWORD");
    return;
  }
  //alert(user);
  //alert(pass);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/login", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    "username" : user,
    "password" : pass
  }));
}
