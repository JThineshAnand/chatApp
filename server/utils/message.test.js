var expect = require('expect');
var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate a message object',()=>{
      var result = generateMessage('Admin','Hi');
       expect(result).toInclude({
         from:'Admin',
         text:'Hi'
       });
      expect(result.createdAt).toBeA('number')
    });
});

describe('generateLocationMessage',()=>{
    it('should generate a Location message object',()=>{
      var lattitude=3;
      var longitude=9;
      var url = 'https://www.google.com/maps/?q=3,9'
      var result = generateLocationMessage('Admin',lattitude,longitude);
       expect(result).toInclude({
         from:'Admin',
         url
       });
      expect(result.createdAt).toBeA('number')
    });
});
