var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var jsonParser = bodyParser.json()

app.use(cors())

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
  });

app.post('/register', jsonParser, function (req, res, next) {
    // execute will internally call prepare and query
    connection.execute(
        'INSERT INTO users (email, password, fname, lname) VALUES (?, ?, ?, ?) ',
        [req.body.email, req.body.password, req.body.fname, req.body.lname],
        function(err, results, fields) {
            if(err) {
                res.json({status : 'error', message : err})
            }
            res.json({status : 'Ok'})
        }
    );
  
})

app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000')
})