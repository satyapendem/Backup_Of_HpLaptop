var assert = require('chai').assert;
var sinon = require('sinon');
function myFunction(condition, callback){
  if(condition){
    callback();
  }
}
describe('myFunction', function() {
  it('should call the callback function', function() {
    var callback = sinon.spy();
    myFunction(true, callback);
    assert(callback.calledOnce);
  });
});
