var bodyParser = require('body-parser');
var mongoose = require('mongoose');



mongoose.connect('mongodb+srv://<user>:<password>@cluster0-csife.mongodb.net/test?retryWrites=true');
var productScheme = new mongoose.Schema({
   productID: String, 
   productName: String, 
   productDes: String 
});


var Products = mongoose.model('Products',productScheme);
var CartList = mongoose.model('CartList',productScheme);



var urlencodedParser = bodyParser.urlencoded({ extended:false });


module.exports = function(app){

    
    
    app.get('/', function(req,resp){
       Products.find({} ,function(err,data){
            if(err) throw err;
            resp.render('Products',{products: data});    
        });
    });

    
    
    
    app.post('/', urlencodedParser, function(req,resp){
        var newProduct = CartList(req.body).save(function(err,data){
            if(err) throw err;
            resp.render('Products',{products: data});
        });

    });





    app.get('/add',  function(req,resp){
        resp.render('Adding',{});
    });


    

    app.post('/add', urlencodedParser, function(req,resp){
        var newProductItem = Products(req.body).save(function(err,data){
            if(err) throw err;
            resp.render('Products',{products: data});
        });
    });




    app.get('/Cart', function(req,resp){
        CartList.find({} ,function(err,data){
            if(err) throw err;
            resp.render('Cart',{cartlist:data});    
        });
    });




    app.delete('/Cart/:id', function(req,resp){
        CartList.find({"productID": req.params.id}).remove(function(err,data){
            if(err) throw err;
            resp.render('Cart',{cartlist:data});
        });
    });

}
