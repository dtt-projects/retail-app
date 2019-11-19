//Continuously checks state of shipping
$(document).ready(function(){ 
    //Gets what the value of the seletor 
    $('#deliveryMethod').on('change', function() {
        //Stores current selector value
        var deliveryMethod
        //Sets current selector value
        deliveryMethod = this.value;
        
        //evaluates user input and renders UI to fit
        if(deliveryMethod == "pickUpInStore"){
           //Pick Up In Store UI 
            document.getElementById('shipToAddress').style.display = "none";
            document.getElementById('pickUpInStore').style.display = "block";
            
        }else{
            //Ship to address UI
            document.getElementById('shipToAddress').style.display = "block";
            document.getElementById('pickUpInStore').style.display = "none";
        }
    });
});

$("#backToShipping").click(function(){
    document.getElementById('cartContent').style.display = "none";
    document.getElementById('shipping').style.display = "block";
    document.getElementById('purchase').style.display = "none";
    document.getElementById('goatPoints').style.display = "none";
    document.getElementById('backToShipping').style.display = "none";
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});




//Process Date when click proceed on shipping page
$("#proceedShipping").click(function(){
    //Regex here
    /*
      var RegExpression = /^[a-zA-Z\s]*$/; 

        if (RegExpression.test($('#recipientName').val())){
            alert("nope");
        }else{
          $('#input').val("");
        }
    */
    
    document.getElementById('cartContent').style.display = "block";
    document.getElementById('shipping').style.display = "none";
    document.getElementById('purchase').style.display = "block";
    document.getElementById('goatPoints').style.display = "block";
    document.getElementById('backToShipping').style.display = "block";
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});


$("#applyGoatPoints").click(function(){
    document.getElementById('applyGoatPoints').style.display = "none";
    document.getElementById('unapplyGoatPoints').style.display = "block";
    document.getElementById('goatPointsSummary').style.display = "block";
});


$("#unapplyGoatPoints").click(function(){
    document.getElementById('applyGoatPoints').style.display = "block";
    document.getElementById('unapplyGoatPoints').style.display = "none";
    document.getElementById('goatPointsSummary').style.display = "none";  
});
 

$("#confirmPurchase").click(function(){
    document.getElementById('purchase').style.display = "none";
    document.getElementById('cartContent').style.display = "none";
    document.getElementById('goatPoints').style.display = "none";
    document.getElementById('confirmation').style.display = "block";
    document.getElementById('backToShipping').style.display = "none";
    $('html, body').animate({ scrollTop: 0 }, 'medium');
});

