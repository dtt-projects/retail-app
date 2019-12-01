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
