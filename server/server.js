var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydb'
});

var app = express()
app.use(cors())
app.use(express.json())

app.get('/Topic', function( req, res, next){
    connection.query(
        'SELECT * FROM `topic`',
        function(err, results, fields) {
          res.json(results)
          console.log(results); 
          console.log(fields); 
        }
      );
})
app.post('/Topic', function( req, res, next){
    res.json(req.body)
    connection.query(
      'INSERT INTO `topic`(`Id`, `Topic`, `Path`, `cName`) VALUES (?,?,?,?)',
      [req.body.Id,req.body.Topic,req.body.Path,req.body.cName],
      function(err, results, fields) {
        res.json(results)
        console.log(results); 
        console.log(fields); 
      }
    );
})
app.get('/test', function( req, res, next){
    res.json({msg:'test this server'})
})
app.listen(1400, function() {
    console.log('server is running')
})
