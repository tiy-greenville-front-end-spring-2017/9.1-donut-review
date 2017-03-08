var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var React = require('react');

var parse = require('./parse');
var models = require('./models/recipe');
var User = require('./models/user').User;

// Controllers
var MarketingContainer = require('./components/marketing.jsx').MarketingContainer;
var AuthContainer = require('./components/auth.jsx').AuthContainer;
var RecipeListContainer = require('./components/recipeList.jsx').RecipeListContainer;
var RecipeAddEditContainer = require('./components/recipeAddEdit.jsx').RecipeAddEditContainer;
var RecipeDetailContainer = require('./components/recipeDetail.jsx').RecipeDetailContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'auth/': 'auth',
    'recipes/': 'recipeList', // C
    'recipes/:id/edit/': 'recipeAddEdit', // D
    'recipes/add/': 'recipeAddEdit', // D
    'recipes/:id/': 'recipeDetail', // E
  },
  initialize: function(){
    var user = User.current();

    if(user){
      parse.initialize({sessionId: user.get('sessionToken')});
    }else{
      parse.initialize();
    }
  },
  index: function(){
    ReactDOM.render(
      React.createElement(MarketingContainer),
      document.getElementById('app')
    )

    // var recipe = new models.Recipe({'name': 'Pasta', 'servings': 4});
    // recipe.get('ingredients').add([
    //   {'name': 'flour', 'qty': 2, 'units': 'cups'},
    //   {'name': 'water', 'qty': 5, 'units': 'tbsp'},
    // ]);
    //
    // ReactDOM.render(
    //   React.createElement(RecipeAdjuster, {recipe: recipe}),
    //   document.getElementById('app')
    // )
  },
  auth: function(){
    ReactDOM.render(
      React.createElement(AuthContainer),
      document.getElementById('app')
    )
  },
  recipeList: function(){
    ReactDOM.render(
      React.createElement(RecipeListContainer),
      document.getElementById('app')
    )
  },
  recipeAddEdit: function(id){
    ReactDOM.render(
      React.createElement(RecipeAddEditContainer, {id: id}),
      document.getElementById('app')
    )
  },
  recipeDetail: function(id){
    ReactDOM.render(
      React.createElement(RecipeDetailContainer, {id: id}),
      document.getElementById('app')
    )
  }
});

var router = new AppRouter();

module.exports = router;
