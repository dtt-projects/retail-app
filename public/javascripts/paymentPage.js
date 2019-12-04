//Continuously checks state of shipping
$(document).ready(function(){ 

    //Gets what the value of the seletor 
    $('#deliveryMethod').on('change', function() {
        //Stores current selector value
        var deliveryMethod;
        //Sets current selector value
        deliveryMethod = this.value;
    
        //evaluates user input and renders UI to fit
        if(deliveryMethod == "pickUpInStore"){
           //Pick Up In Store UI
            
            document.getElementById('address1').style.display = "none";
            document.getElementById('address2').style.display = "none";
            document.getElementById('city').style.display = "none";
            document.getElementById('zipCode').style.display = "none";
            document.getElementById('state').style.display = "none";
            
            document.getElementById('shippingAddress1').readOnly = true;
            document.getElementById('shippingAddress2').readOnly = true;
            document.getElementById('shippingCity').readOnly = true;
            document.getElementById('shippingZipCode').readOnly = true;
            document.getElementById('shippingState').readOnly = true;
            
            document.getElementById('shippingAddress1').value = "34 Lauer Rd";
            document.getElementById('shippingAddress2').value = " ";
            document.getElementById('shippingCity').value = "Poughkeepsie";
            document.getElementById('shippingZipCode').value = "12603";
            document.getElementById('shippingState').value = "NY";
    
            
        }else{
            //Ship to address UI
            document.getElementById('address1').style.display = "block";
            document.getElementById('address2').style.display = "block";
            document.getElementById('city').style.display = "block";
            document.getElementById('zipCode').style.display = "block";
            document.getElementById('state').style.display = "block";
            
            document.getElementById('shippingAddress1').readOnly = false;
            document.getElementById('shippingAddress2').readOnly = false;
            document.getElementById('shippingCity').readOnly = false;
            document.getElementById('shippingZipCode').readOnly = false;
            document.getElementById('shippingState').readOnly = false;
            
            document.getElementById('shippingAddress1').value = "";
            document.getElementById('shippingAddress2').value = "";
            document.getElementById('shippingCity').value = "";
            document.getElementById('shippingZipCode').value = "";
            document.getElementById('shippingState').value = "";
        }
    });
    


//Process Date when click proceed on shipping page
$("#proceedShipping").click(function(){
    document.getElementById('shipping').style.display = "none";
    document.getElementById('cartContent').style.display = "block";
    document.getElementById('purchase').style.display = "block";
    document.getElementById('goatPoints').style.display = "block";
    document.getElementById('backToShipping').style.display = "block";
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});
    
    

$("#backToShipping").click(function(){
    document.getElementById('cartContent').style.display = "none";
    document.getElementById('shipping').style.display = "block";
    document.getElementById('purchase').style.display = "none";
    document.getElementById('goatPoints').style.display = "none";
    document.getElementById('backToShipping').style.display = "none";
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
    
    
});

