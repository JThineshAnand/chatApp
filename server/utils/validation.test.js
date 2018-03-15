var expect = require('expect');
var {realstring} =require('./validation.js');

describe('realstring',()=>{
  it('should test validation for number',()=>{
    var res = realstring(98);
    expect(res).toBeFalsy();
  });
  it('should test validation for spaces (just spaces)',()=>{
    var res = realstring('    ');
    expect(res).toBeFalsy();
  });
  it('should test validation for number',()=>{
    var res = realstring(' sdf sdf ');
    expect(res).toBeTruthy();
  });
});
