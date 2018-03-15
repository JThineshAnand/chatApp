const {Users} = require('./users');
const expect = require('expect');

describe('users',()=>{
  var users;
   beforeEach(()=>{

     users = new Users();
     users.users = [{
       id:'1',
       name:'Mike',
       room:'Node course'
     },{
       id:'2',
       name:'Mikey',
       room:'React course'
     },{
       id:'3',
       name:'Micky',
       room:'Node course'
     }]
   });

  it('should add a user',()=>{
    var users = new Users();
    var user ={
      id:'123',
      name:'Anand',
      room:'31'
    }
    var res = users.addUser(user.id,user.name,user.room);
    expect(res).toEqual(user);

  });

  it('should get user',()=>{
    var res = users.getUser('1');

    expect(res.id).toBe('1');
  });

  it('should not get user',()=>{
    var res = users.getUser('11');

    expect(res).toNotExist();

  });

  it('should remove a user',()=>{
    var res = users.removeUser('1');

    expect(res).toEqual({
      id:'1',
      name:'Mike',
      room:'Node course'
    });

  });

  it(' should not remove a user',()=>{
    var res = users.removeUser('11');

    expect(res).toNotExist();

  });



  it('should get node user list',()=>{
    var res = users.getUserlist('Node course');

    expect(res).toEqual(['Mike','Micky']);
  });

  it('should get react user list',()=>{
    var res = users.getUserlist('React course');

    expect(res).toEqual(['Mikey']);
  });

});
