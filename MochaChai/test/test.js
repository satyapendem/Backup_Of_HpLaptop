// // var assert = require('assert');
// // describe('Array', function() {
// //   describe('#indexOf()', function() {
// //     it('should return -1 when the value is not present', function() {
// //       assert.equal(-1, [1,2,3].indexOf(4));
// //     });
// //   });
// // });
// var request = require("request"),
//     assert = require('assert'),
//     helloWorld = require("../app.js"),
//     base_url = "http://localhost:8081/";
//
// describe("Hello World Server", function() {
//   describe("GET /", function() {
//     it("returns status code 200", function(done) {
//       request.get(base_url, function(error, response, body) {
//         //expect(response.statusCode).toBe(200);
//         assert.equal(200, response.statusCode);
//         done();
//       });
//     });
//     it("returns Hello World", function(done) {
//       request.get(base_url, function(error, response, body) {
//         //expect(body).toBe("Hello World");
//         assert.equal("Hello World", body);
//         helloWorld.closeServer();
//         done();
//       });
//     });
//   });
// });
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../app');
chai.use(chaiHttp);
describe('/GET', ()=>{
  if('the status should be 200',(done)=>{
    chai.request(server)
       .get('/')
       .end((err,res)=>{
          res.body.should.have.status(200);
          done();
       });
  });
});
