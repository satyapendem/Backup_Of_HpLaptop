var express = require('express');
var app = express();
var exports = module.exports = {};

app.get('/', function(req, res){
  res.send('Hello World');
});

var server = app.listen(8081, function(){
  console.log('server running');
});

exports.closeServer = function(){
  server.close();
};
