$(document).ready(function(){
    
    $('form').on('submit',function(){
        var Uid = $('#productID');
        var name = $('#productName');
        var des = $('#productDes');
        var product = {productID: Uid.val(),productName: name.val(),productDes: des.val()};

        $.ajax({
            type: 'POST',
            url: '/add',
            data: product,
            success: function(data){
                $("#addedSuccessfully").css('transform','scale(1)');
                   setTimeout(function(){
                    location.reload();
                   },1500);
            }
        });
        return false;

    });





    $('.addToCart').on('click',function(){
        var eleID = this.id;
        var Uid = eleID.split("%")[0].toString();
        var name = eleID.split("%")[1].toString();
        var des = eleID.split("%")[2].toString();
        var product = {productID: Uid,productName: name,productDes: des};

        $.ajax({
            type: 'POST',
            url: '/',
            data: product,
            success: function(data){
                $("#addCartSuccess").css('transform','scale(1)');
                   setTimeout(function(){
                    location.reload();
                   },1000);
            }
        });
        return false;
    });





    $('.removeCart').on('click',function(){
        var Uid = this.id;                 
        $.ajax({
            type: 'DELETE',
            url:  '/cart/' + Uid,
            success: function(cart){
                location.reload();
            }   
        });  
        return false;
    });




    
});