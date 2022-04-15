const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const ports = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-type, Authorization');
  next();
});

app.get('/', (req,res)=> {
  res.send("Root route");

});

app.listen(ports, function(){
  console.log(`Server up and running on port ${ports}!`);
});





// creating a route with 2 paramaters (username, password) in request
// connect to postgressDB
// Comparing username and password with DB
// If Success, return success (redirect to project mapping dashboard/table)
// Else (failure), display login error message
