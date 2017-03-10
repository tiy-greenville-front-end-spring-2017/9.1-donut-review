var Backbone = require('backbone');

var parse = require('../parse');
var User = require('./user').User;
var IngredientCollection = require('./ingredient').IngredientCollection;


var Recipe = parse.ParseModel.extend({
  defaults: function(){
    return {
      // name: '',
      // description: '',
      ingredients: new IngredientCollection()
    }
  },
  urlRoot: 'https://tiny-parse-server.herokuapp.com/classes/BatchRecipe'
});

var RecipeCollection = parse.ParseCollection.extend({
  model: Recipe,
  baseUrl: 'https://tiny-parse-server.herokuapp.com/classes/BatchRecipe'
});


module.exports = {
  Recipe,
  RecipeCollection
}
