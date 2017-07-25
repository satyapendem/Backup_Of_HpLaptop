var assert = require('chai').assert;
var sinon = require('sinon');
var $=require('jquery');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var expect = chai.expect;
var should = chai.should();
var myapi = require("../myapi");
chai.use(chaiHttp);
var XMLHttpRequest=require('xmlhttprequest').XMLHttpRequest;
describe('MyAPI', function() {
       var xhr;
       var requests;
beforeEach(function() {
       xhr = sinon.useFakeXMLHttpRequest();
       requests = [];
xhr.onCreate = function(xhr) {
       requests.push(xhr);
  };
});
afterEach(function() {
  xhr.restore();
  });
  it('should parse fetched data as JSON', function(done) {
          var data = {"name":"suresh","password":"password2"};
          var dataJson = JSON.stringify(data);
          myapi.get(function(err, result) {
          expect(result).to.deep.equal(data);
          done();
  });
});
it('should check the name and password', function(done) {
          var data = {"name":"suresh","password":"password2"};
          var dataJson = JSON.stringify(data);
          myapi.get(function(err, result) {
          expect(result.name).to.equal("suresh");
          expect(result.password).to.equal("password2");

          done();
   });
});
it('should post the data with ajax call',function(done){
     var data  = {"name":"satya","password":"satya123"};
     var dataJson = JSON.stringify(data);
     myapi.post(data, function() { });
     done();
  });
});
describe('should post the data to the api',()=>{
  it('/addUser POST',(done)=>{
    chai.request(server)
     .post('/addUser')
     .set('content-type','application/json')
     .send({'name' : 2, 'password':3})
     .end((err,res)=>{
       res.body.should.have.property('name');
       done();
     });
  });
});
