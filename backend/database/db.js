const express = require('express');
const {Pool, Client} = require('pg');
const bodyParser = require('body-parser');
const app = express();
const ports = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));

const client = new Client({
  host:"localhost",
  user:"postgres",
  port: 5432,
  password: "root",
  database: "users"
})

module.exports = client;
