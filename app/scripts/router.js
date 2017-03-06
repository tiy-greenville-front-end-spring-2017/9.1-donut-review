var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var React = require('react');

var models = require('./models/recipe');
var RecipeAdjuster = require('./components/recipe.jsx').RecipeAdjuster;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login/': 'login',
    'signup/': 'signup'
  },
  index: function(){
    var recipe = new models.Recipe({'name': 'Pasta', 'servings': 4});
    recipe.get('ingredients').add([
      {'name': 'flour', 'qty': 2, 'units': 'cups'},
      {'name': 'water', 'qty': 5, 'units': 'tbsp'},
    ]);

    ReactDOM.render(
      React.createElement(RecipeAdjuster, {recipe: recipe}),
      document.getElementById('app')
    )
  }
});

var router = new AppRouter();

module.exports = router;
