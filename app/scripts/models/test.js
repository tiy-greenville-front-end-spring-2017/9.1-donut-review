var Backbone = require('backbone');

var Test = Backbone.Model.extend({
});

var TestCollection = Backbone.Collection.extend({
  model: Test,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/posts'
});

module.exports = {
  Test,
  TestCollection
};
