
var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const jwt = require('jsonwebtoken');
const key = "kim";

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'mydb'
// });
// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT
// });

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'mydb',
    port: '3306'
});

var app = express()
app.use(cors())
app.use(express.json())

function verifyToken(req, res, next) {
  let token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No have Token' });

  console.log("token", token);
  token = token.split(" ")[1];
  console.log("tokensplit", token);
  
  jwt.verify(token, key, (err, decoded) => {
      if (err) return res.status(401).json({ message: '2' });
      req.userId = decoded.id;
      next();
  });
}
app.get('/XY', function (req, res, next) {
  connection.query(
    'SELECT * FROM `topic`',
    function (err, results, fields) {
      res.json(results)
      console.log(results);
      console.log(fields);
    }
  );
})

app.get('/equation',verifyToken, function (req, res, next){
  console.log("yyyy");
  connection.query(
    'SELECT * FROM mydb.Equation',
    function (err, results, fields) {
      res.json(results)
      console.log(results);
      console.log(fields);
    }
  );
})
// app.post('/XY', function( req, res, next){
//     res.json(req.body)
//     connection.query(
//       'INSERT INTO `topic`(`X`, `Y`) VALUES (?,?)',
//       [req.body.X,req.body.Y],
//       function(err, results, fields) {
//         res.json(results)
//         console.log(results); 
//         console.log(fields); 
//       }
//     );
// })
// app.get('/numXY', function( req, res, next){
//     connection.query(
//         'SELECT * FROM `numofdata`',
//         function(err, results, fields) {
//           res.json(results)
//           console.log(results); 
//           console.log(fields); 
//         }
//       );
// })
// app.post('/numXY', function( req, res, next){
//     res.json(req.body)
//     connection.query(
//       'INSERT INTO `numofdata`(`N`, `X`, `Y`)  VALUES (?,?,?)',
//       [req.body.N,req.body.X,req.body.Y],
//       function(err, results, fields) {
//         res.json(results)
//         console.log(results); 
//         console.log(fields); 
//       }
//     );
// })
// app.post('/equation', function( req, res, next){
//     res.json(req.body)
//     connection.query(
//       'INSERT INTO `Equation`(`Equation`, `Xl`,`Xr`) VALUES (?,?,?)',
//       [req.body.Equation,req.body.Xl,req.body.Xr],
//       function(err, results, fields) {
//         res.json(results)
//         console.log(results); 
//         console.log(fields); 
//       }
//     );
// })

app.get('/login', function (req, res, next) {
  const userId = "JRP";
  const token = jwt.sign({ id: userId }, key, { expiresIn: '1h' });
  
  res.json({ token });
});


// app.post('/login', function (req, res, next) {
//   // Check the user's credentials and get the user's ID
//   const userId = 123;
//   // Generate a token with the user's ID
//   const token = jwt.sign({ id: userId }, 'your_secret_key', { expiresIn: '1h' });
//   // Return the token to the client
//   res.json({ token });
// });

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.listen(1400, function () {
  console.log('server is running')
})
module.exports = app;