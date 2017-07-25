var XMLHttpRequest=require('xmlhttprequest').XMLHttpRequest;
module.exports = {
get: function(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8081/2', true);
  xhr.onreadystatechange = function() {
if(xhr.readyState == 4) {
  if(xhr.status == 200) {
   callback(null, JSON.parse(xhr.responseText));
}
else {
   callback(xhr.status);
  }
 }
};
xhr.send();
 },
post: function(data, callback) {
   var xhr = new XMLHttpRequest();
     xhr.open('POST', 'http://localhost:8081/addUser', true);
      xhr.onreadystatechange = function() {
if(xhr.readyState == 4) {
  callback();
 }
};
  xhr.send(JSON.stringify(data));
}
};
