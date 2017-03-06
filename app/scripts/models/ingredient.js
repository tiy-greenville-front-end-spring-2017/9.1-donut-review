var Backbone = require('backbone');
var Fraction = require('fraction.js');


var Ingredient = Backbone.Model.extend({
  qtyDisplay: function(factor){
    factor = factor || 1;
    var qtyDisplay = Fraction(factor * this.get('qty'));
    return qtyDisplay.toFraction(true);
  }
});

var IngredientCollection = Backbone.Collection.extend({
  model: Ingredient
});


module.exports = {
  Ingredient,
  IngredientCollection
}
