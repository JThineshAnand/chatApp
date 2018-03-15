class Users {
  constructor(){
    this.users=[]
  }

  addUser(id,name,room){
    var user = {
      id,name,room
    };
    this.users.push(user);
    return user;
  }

  getUser(id){
    var users = this.users.filter((user) => user.id === id);
    return users[0];

  }

  removeUser(id){
    var user = this.users.filter((user) => user.id === id)[0];
    if(user){
    this.users = this.users.filter((userItem) => userItem.id!== id);
  }
    return user;
  }



  getUserlist(room){
    var userlist = this.users.filter((user) => user.room===room);
    var userArray = userlist.map((user) => user.name);

    return userArray;
  }

};

module.exports = {Users};
