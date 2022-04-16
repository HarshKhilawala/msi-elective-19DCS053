const express = require('express');
const bodyParser = require('body-parser');
const client = require('./database/db.js');
const app = express();
const bcrypt = require('bcrypt');
const ports = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-type, Authorization');
  next();
});

app.get("/", (req,res)=>{
  let query1 = 'Select * from projects.usermanagement';
  client.query(query1, (err,result)=>{
    if(err){
      res.status(400).json({"Reason":"Error in DB"});
    }
    else {
      res.status(200).json(result.rows);
    }
    client.end;
  });
});

app.post("/login", (req, res)=>{
  let {username, password} = req.body;
  let query1 = `SELECT * from projects.usermanagement where username = $1`;
  client.query(query1,[username], (req,result)=>{
    if(err){
      res.status(400).json({"Reason":"Error in DB"});
    } else if(result.rows.length===0){
      res.send("Users does not exist.");
    } else {
      let userData = result.rows[0];
      if (userData.password === password){
        console.log("Login Successful!");
        res.status(200).json({"Reason": "Login Successful"});
      } else {
        console.log("Login Failed! Username or password does not match.")
        res.send("Login Failed!");
      }
    }

    client.end;
  });
});

app.post('/register', (req, res)=>{
  let {username, password} = req.body;

  // let query1 = `INSERT INTO projects.usermanagement (username, password) VALUES($1, $2)`;
  client.query(`INSERT INTO projects.usermanagement (username, password) VALUES (${username}, ${password})`, [username, password], (err, result)=>{
    if(err){
      res.status(400).json({"Reason":"DB Error"});
    } else {
      res.status(200).json({"Reason":"User Inserted Successfully."});
    }

  });

  client.end;
});


app.listen(ports,()=>{
  console.log("Server up and running on port 3000!");
});


// creating a route with 2 paramaters (username, password) in request
// connect to postgressDB
// Comparing username and password with DB
// If Success, return success (redirect to project mapping dashboard/table)
// Else (failure), display login error message
