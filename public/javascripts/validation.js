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

function verifyPasswordRepeat(password, passwordRepeat, id){
  var passwordRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  if(password.equals(passwordRepeat)){
    alert("We need matching");
  }
  if(passwordRegExp.test(password) != true){
    alert("Please enter the same password as before");
  }
}

function verifyName(name, id){
  var nameRegEx = new RegExp(/^[a-zA-Z\s]+$/);
  if(nameRegEx.test(name) != true){
    alert("Please use letters in the name field");
  }
//  var validName = prompt("Please use letter only!");
  //while(nameRegEx.test(validName) != true){
  //  validName = prompt("Please enter letters only");
  //}
}

function verifyPhoneNum(number, id){
  var phoneNum = new RegExp(/^[0-9]+$/);
  if(phoneNum.test(number) != true){
    alert("Please use only numbers and be sure not to use any dashes");
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
}


function verifyCity(city, id){
  var cityRegEx = new RegExp(/^[a-zA-Z]+$/);
  if(cityRegEx.test(city) != true){
    alert("Please use only letters in the city field");
  }
}

function verifyZip(zip, id){
  var zipRegExp = new RegExp(/^[0-9]+$/);

  if(zipRegExp.test(zip) != true || zip.length != 5){
    alert("Please use 5 numbers for your zip code");
  }


}

function verifyState(state, id){
  var stateRegEx = new RegExp(/^[a-zA-Z]+$/);

  if(stateRegEx.test(state) != true){
    alert("Please use only letters in the state field");
  }
}


function verifyCardHolder(cardHolder, id){
  var cardHolderRegEx = new RegExp(/^[a-zA-Z\s]+$/);
  while(cardHolderRegEx.test(cardHolder) != true){
     alert("Please use your name in the card holder field");
  }
}

function verifyExpiration(expirationMonth, id){
  var expirationDateRegEx = new RegExp(/^[0-9]+$/);
  if(expirationMonth < 1 || expirationMonth > 12){
    alert("Please enter a valid month");
  }
  if(expirationDateRegEx.test(expirationMonth) != true){
    alert("Please use two numbers for the expiration month");
  }
}


function verifyExpirationYear(expirationYear, id){
  var expirationDateRegEx = new RegExp(/^[0-9]+$/);
  if(expirationDateRegEx.test(expirationYear) != true){
    alert("Please use two numbers for the expiriation year");
  }
}

function verifyCard(cardNumber, id){
  //This is the regular expression for visa, mastercard, amex, and discover
  var visa = new RegExp("^(?:4[0-9]{12}(?:[0-9]{3})?)");
  var mastercard = new RegExp("^5[1-5][0-9]{14}$");
  var amex = new RegExp("3[47][0-9]{13}$");
  var discover = new RegExp("6(?:011|5[0-9]{2})[0-9]{12}");
  var goodCard = false;
  //Here we test every card and see which it may be.
  if(visa.test(cardNumber) == true){
    goodCard = true;
  }
  if(mastercard.test(cardNumber) == true){
    goodCard = true;
  }
  if(amex.test(cardNumber) == true){
    goodCard = true;
  }
  if(discover.test(cardNumber) == true){
    goodCard = true;
  }
  //If none of the validations work then we need a new card number
  if(!goodCard){
    alert("Please enter a valid credit card");
  }
}


function verifyCVC(cvc, id){
  var cvcRegExp = new RegExp(/^[0-9]+$/);
  var cvcLength = document.getElementById("cvc").value;
  if(cvcRegExp.test(cvc) != true || cvcLength.length < 3){
    alert("Please enter a valid cvc combination");
  }
}
