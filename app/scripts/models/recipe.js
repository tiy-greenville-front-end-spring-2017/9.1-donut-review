var Backbone = require('backbone');

var IngredientCollection = require('./ingredient').IngredientCollection;

var Recipe = Backbone.Model.extend({
  defaults: function(){
    return {
      // name: '',
      // description: '',
      ingredients: new IngredientCollection()
    }
  }
});

var RecipeCollection = Backbone.Collection.extend({
  model: Recipe
});




module.exports = {
  Recipe,
  RecipeCollection
}
