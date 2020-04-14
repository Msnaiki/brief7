const path = require('path');
const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const dataAccess = require('./MyModules/dataAccess');
var bodyParser = require('body-parser');

app.engine('hbs',hbs({extname:'hbs',defaultLayout:'reserve',layoutsDir:__dirname + '/views'}))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/Style",express.static("./Style"))
app.use("/Script",express.static("./Script"))
app.use("/Images",express.static("./Images"))

// accept json 
app.use(bodyParser.json());

var Producto = dataAccess.LoadJson('Data/products.json');


//read
app.get("/reserve.hbs", (req, res) => {
  res.render('reserve.hbs',{Producto});
});

//write
app.post("/ADDproduct",function(req,res){
  
  var new_product={id:req.body.addname, source:req.body.addsource} ;
  Producto.push(new_product);
  dataAccess.SaveJson("data/products.json",Producto);
  
  res.render('reserve.hbs',{Producto});
}); 

//update

app.post("/updateproduct",function(req,res){
    
  var new_product={id:req.body.newname, source:req.body.newsource} ;

  for(var i=0;i<Producto.lenght;i++){
    console.log(Producto);
    if(Producto[i].id==req.body.nameup){
      Producto[i].id=new_product.id;
      Producto[i].source=new_product.source;
      
      break;
    }
    // console.log(req.body.nameup);
  }
  
  // dataAccess.SaveJson("data/products.json",JSON.stringify(Producto));
  
  
  res.render('reserve.hbs',{Producto});
}); 
 





  var port = process.env.PORT || 4000;
app.listen(port,() => console.log(`Listening on port ${port}...`));

