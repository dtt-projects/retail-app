document.getElementById('proceedShipping').onclick = function(){
    alert("Now Validating Address Inputs");
    document.getElementById('shipping').style.display = "none";
    document.getElementById('purchase').style.display = "block";
}

document.getElementById('confirmPurchase').onclick = function(){
    //alert("Now Validating Credit Card");
    //alert("Confirmed!");
    document.getElementById('purchase').style.display = "none";
    //document.getElementById('shipping').style.display = "none";
    document.getElementById('cartContent').style.display = "none";
    document.getElementById('confirmation').style.display = "block";
    alert("confirmed");
}