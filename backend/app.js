const express = require('express');
const bodyParser = require('body-parser');
const client = require('./database/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const e = require('express');

const app = express();
const ports = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-type, Authorization');
  next();
});

function verifyToken(req, res, next){
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }

  // console.log(req.headers);
  let token = req.headers.authorization.split(' ')[1];

  if(token === 'null'){
    return res.status(401).send('Unauthorized request');
  }

  let payLoad = jwt.verify(token, 'secret');
  if(!payLoad){
    return res.status(401).send('Unauthorized request');
  }

  req.email = payLoad.subject;
  next();
}

app.get("/", (req,res)=>{

  client.query('SELECT * FROM projects.usermanagement', (err,result)=>{
    if(err){
      res.status(400).json({"Reason":"Error in DB"});
    }
    else {
      res.status(200).json(result.rows);
    }
  });
});

app.get("/nav", verifyToken,(req, res)=>{
  let email = req.email; // email after verification(verifyToken) of token
  client.query(`SELECT * FROM projects.usermanagement where email = $1`, [email], (err, result)=>{
    if(err){
      res.status(400).json({"Reason":"Error in DB"});
    } else {
      let userData = result.rows[0];
      let name = userData.name;
      let role = userData.role;
      res.status(200).json({name, email, role});
    }
  });
});

app.get("/table", verifyToken, (req, res)=>{

  client.query('SELECT * FROM projects.projectmanagement', (err,result)=>{
    if(err){
      res.status(400).json({"Reason":"Error in DB"});
    } else {
      console.log(result.rows);
      res.status(200).json({table: result.rows});
    }
  });

})

app.post("/login", (req, res)=>{
  let {email, password} = req.body;
  console.log(req.body);

  client.query(`SELECT * from projects.usermanagement where email = $1`,[email], (err,result)=>{
    if(err){
      res.status(400).json({"Reason":"Error in DB"});
    } else if(result.rows.length===0){
      res.send("Users does not exist.");
    } else {
      let userData = result.rows[0];
      bcrypt.compare(password, userData.password).then((result)=>{
        if(result){
          console.log("Login Successful!");
          let payLoad = {subject: userData.email};
          let token = jwt.sign(payLoad, 'secret');
          res.status(200).json({'status': true , 'message' : 'valid user',token});
        } else {
          console.log("Login Failed! Incorrect Username or password");
          res.status(401).json({'status': false, 'message': 'invalid user'});
        }
      });
    }

  });
});

app.post('/register', (req, res)=>{
  let {name, email, password, role} = req.body;
  console.log(req.body);

  bcrypt.hash(password,10).then((hashedPassword)=>{
    client.query(`INSERT INTO projects.usermanagement(name, email, password, role) VALUES($1, $2, $3, $4)`,[name ,email, hashedPassword, role], (err, result)=>{
      if(err) {
        res.status(400).json({"Reason":"DB Error"});
      } else {
        let payLoad = {subject:email,};
        let token = jwt.sign(payLoad, 'secret');
        res.status(200).json({"Reason":"User Inserted Successfully.",token});
      }
    });
  });

});

client.connect().then(()=>{
  console.log("Database Connected!");
  app.listen(ports,()=>{
    console.log("Server up and running on port 3000!");
  });
});




// creating a route with 2 paramaters (username, password) in request
// connect to postgressDB
// Comparing username and password with DB
// If Success, return success (redirect to project mapping dashboard/table)
// Else (failure), display login error message
