$("#editAccountInformation").click(function(){

    document.getElementById('sumbitChanges').style.display = "block";
    document.getElementById('cancelChanges').style.display = "block";
    document.getElementById('editAccountInformation').style.display = "none";

    document.getElementById('firstName').contentEditable = "true";
    document.getElementById('lastName').contentEditable = "true";
    document.getElementById('phoneNumberHome').contentEditable = "true";
    document.getElementById('phoneNumberMobile').contentEditable = "true";
    document.getElementById('addressOne').contentEditable = "true";
    document.getElementById('addressTwo').contentEditable = "true";
    document.getElementById('cityName').contentEditable = "true";
    document.getElementById('cityName').contentEditable = "true";
    document.getElementById('zipCode').contentEditable = "true";
    document.getElementById('genderCode').contentEditable = "true";

    $('html, body').animate({ scrollTop: 0 }, 'slow');
});

$("#sumbitChanges").click(function(){
    location.reload();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});



$("#cancelChanges").click(function(){
    location.reload();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});
