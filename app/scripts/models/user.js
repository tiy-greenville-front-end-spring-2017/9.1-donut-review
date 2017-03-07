var $ = require('jquery');
var Backbone = require('backbone');

var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://tiny-parse-server.herokuapp.com/users'
  // function(){
  //   return parse.BASE_API_URL + '/users';
  // }
}, {
  login: function(cridentials, callback){
    var url = 'https://tiny-parse-server.herokuapp.com/login?' + $.param(cridentials);
    $.get(url).then(data => {
      var newUser = new User(data);
      User.store(newUser);
      callback(newUser);
    });
  },
  signup: function(creds, callback){
    var newUser = new User(creds);
    newUser.save().then(() => {
      User.store(newUser);
      callback(newUser);
    });
    return newUser;
  },
  store: function(user){
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
  },
  current: function(){
    var user = localStorage.getItem('user');

    // if no user in local storage, bail
    if(!user){
      return false;
    }

    var currentUser = new User(JSON.parse(user));

    // If we don't have a token, bail
    if(!currentUser.get('sessionToken')){
      return false;
    }

    return currentUser;
  }
});

module.exports = {
  User
};
