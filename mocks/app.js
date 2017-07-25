var express = require('express');
var app = express();
var fs = require('fs');
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})
var user = {
   "user4" : {
      "name" : "sandy",
      "password" : "password4",
   }
}
//post
app.post('/addUser', function (req, res) {
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})
//GET
app.get('/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id]
       console.log( user );
       res.end( JSON.stringify(user));
   });
})
//DELETE
app.delete('/deleteUser', function (req, res) {
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
       data = JSON.parse(data);
       delete data["user" + 2];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})
var server = app.listen(8081, function () {
  console.log("server login");
});
module.exports = server;
