var express = require('express');
var ProductsController = require('./Controllers/ProductsController');

var app = express();

app.set('view engine','ejs');
app.use(express.static('./public'));

ProductsController(app);


app.listen(3030);
