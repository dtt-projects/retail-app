
function verifyUserName(username, id){
  var userNameRegExp = new RegExp(/^[a-z0-9]+$/i);
  if(userNameRegExp.test(username) != true){
    alert("Please enter correct information");
  }
}

function verifyPassword(password, id){
  var passwordRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if(passwordRegExp.test(password) != true){
    alert("Please enter correct information");
  }
}

function verifyEmailAddress(email, id){
  var emailAddressRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if(emailAddressRegExp.test(email) != true){
    alert("Please follow the format of: emailaddress@example.com");
  }else{
    alert("Check " + email + " for the remaining procedure");
  }
}

function verifyFirstName(firstname, id){
  var firstNameRegExp = new RegExp(/^[A-Za-z]+$/);
  if(firstNameRegExp.test(firstname) != true){
    alert("Please enter only letters for the first name field");
  }
}

function verifyLastName(lastname, id){
  var lastnameRegExp = new RegExp(/^[A-Za-z]+$/);
  if(lastnameRegExp.test(lastname) != true){
    alert("Please enter only letters for the last name field");
  }
}

function verifyUser_Name(username, id){
  var userNameRegExp = new RegExp(/^[a-z0-9]+$/i);
  if(userNameRegExp.test(username) != true){
    alert("Please enter correct information");
  }
}

function verifyEmail(email, id){
  var emailAddressRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if(emailAddressRegExp.test(email) != true){
    alert("Please follow the format of: emailaddress@example.com");
  }
}


function verifyPassword(password, id){
  var passwordRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if(passwordRegExp.test(password) != true){
    alert("Please create a password that has: \n" +
          "One uppper case letter(s) \n" +
          "One special chatacter(s) \n" +
          "At least 8 characters \n");
  }
}

function verifyPasswordRepeat(password, id){
  var passwordRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if(passwordRegExp.test(password) != true){
    alert("Please enter the same password as before");
  }
}

function verifyName(name, id){
  var nameRegEx = new RegExp(/^[a-zA-Z\s]+$/);
  if(nameRegEx.test(name) != true){
    alert("Please use letters in the name field");
  }
  var validName = prompt("Please use letter only!");
  while(nameRegEx.test(validName) != true){
    validName = prompt("Please enter letters only");
  }
}

function verifyPhoneNum(number, id){
  var phoneNum = new RegExp(/^[0-9]+$/);
  if(phoneNum.test(number) != true){
    alert("Please use only numbers and be sure not to use any dashes");
  }
  var validPhoneNum = prompt("Please enter numbers only!");
  while(phoneNum.test(validPhoneNum) != true){
    validPhoneNum = prompt("Please enter numbers only");
  }
}

function verifyAddress(address, id){
  var address1 = new RegExp(/^[0-9]+$/);
  var address2 = new RegExp(/^[a-zA-Z]+$/);
  var splitAddress = address.split(" ");

  if(address1.test(splitAddress[0]) != true){
    alert("Please use numbers first and letters after for the address field");
  }else if(address2.test(splitAddress[1]) != true || splitAddress[1] == undefined){
    alert("Please use letters after the numbers for the address field");
  }
  var validAddress = prompt("Please enter numbers followed by letters");
  while(address1.test(validAddress) != true || address2.test(validAddress != true)){
    validAddress = prompt("Please enter numbers followed by letters");
  }
}

function verifyAddress2(address, id){
  var address1 = new RegExp(/^[0-9]+$/);
  var address2 = new RegExp(/^[a-zA-Z]+$/);
  var splitAddress = address.split(" ");


  if(address1.test(splitAddress[0]) != true){
    alert("Please use numbers first and letter after for the address field");
  }else if(address2.test(splitAddress[1]) != true || splitAddress[1] == undefined){
    alert("Please use letters after the numbers for the address field");
  }
  var validAddress2 = prompt("Please enter numbers followed by letters");
  while(address1.test(validAddress2) != true || address2.test(validAddress) != true){
    validAddress2 = prompt("Please enter number followed by letters");
  }
}


function verifyCity(city, id){
  var cityRegEx = new RegExp(/^[a-zA-Z]+$/);
  if(cityRegEx.test(city) != true){
    alert("Please use only letters in the city field");
    var validCity = prompt("Please enter a valid city");
    while(cityRegEx.test(validCity) != true){
      validCity = prompt("Please enter a valid city!");
    }
  }
}

function verifyZip(zip, id){
  var zipRegExp = new RegExp(/^[0-9]+$/);

  if(zipRegExp.test(zip) != true || zip.length != 5){
    alert("Please use 5 numbers for your zip code");
  }
  var validZip = prompt("Please enter a valid zip");
  while(zipRegExp.test(validZip) != true){
    validZip = prompt("Please enter a valid zip");
  }
}

function verifyState(state, id){
  var stateRegEx = new RegExp(/^[a-zA-Z]+$/);

  if(stateRegEx.test(state) != true){
    alert("Please use only letters in the state field");
  }

  var validState = prompt("Please enter a valid two letter abbreviation");
  while(stateRegEx.test(state) != true){
    valid
  }
}
