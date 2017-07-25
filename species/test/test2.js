var sinon = require('sinon');
var user = {
  setName: function(name){
    this.name = name;
  }
}
var setNameSpy = sinon.spy(user, 'setName');

user.setName('satya');
console.log(setNameSpy.callCount);
setNameSpy.restore();
