var React = require('react');

var BaseLayout = require('../layouts/base.jsx').BaseLayout;
var RecipeCollection = require('../models/recipe').RecipeCollection;
var User = require('../models/user').User;

/*
Parse Pointer Notes

User.objectId

Recipe.owner -> User.objectId
(Pointer to the User class)

1) When we save the Recipe we need to set the pointer
Recipe.owner needs to be filled with the correct objectId

This is done by setting the Recipe.user to a Parse Pointer Object:

```js
{'__type': 'Pointer', className: '_User', objectId: 'dkjlj3930u4jfd'}
```

2) Getting Recipes by a particular user.

This is done with a query string on the url of the endpoint:

https://tiny-parse-server.herokuapp.com/classes/Recipe/?where={'owner': {'__type': 'Pointer', className: '_User', objectId: 'dkjlj3930u4jfd'}}
*/


class RecipeListContainer extends React.Component{
  constructor(props){
    super(props);

    // bind methods to this
    this.search = this.search.bind(this);

    // Get currently logged in user's id
    var userId = User.current().get('objectId');

    // Get recipe collection
    var recipeCollection = new RecipeCollection();

    // Fetch recipes for the logged in user
    recipeCollection.parseWhere(
      'owner', '_User', userId
    ).fetch().then(() => {
      this.setState({collection: recipeCollection});
    });

    this.state ={
      collection: recipeCollection
    }
  }
  search(e){
    var searchTerm = e.target.value;
    var collection = this.state.collection;

    // name$in
    collection.parseWhere('name', searchTerm).fetch().then(() => {
      this.setState({collection: collection});
    });
  }
  render(){
    return (
      <BaseLayout>
        <h1>
          My Recipes

          <a href="#recipes/add/" className="btn btn-primary pull-right">
            Add Recipe
          </a>
        </h1>

        <input onChange={this.search} type="text" placeholder="Search"/>

        <RecipeList collection={this.state.collection} />

      </BaseLayout>
    )
  }
}

class RecipeList extends React.Component{
  render(){
    var recipeList = this.props.collection.map((recipe) => {
      return (
        <li key={recipe.cid} className="list-group-item clearfix">
          <a href={"#recipes/" + recipe.get('objectId')+ "/"}>
            {recipe.get('name')}
          </a>
          <a href={"#recipes/" + recipe.get('objectId')+ "/edit/"} className="btn btn-warning pull-right">
            Edit
          </a>
        </li>
      );
    });

    return (
      <ul className="list-group">
        {recipeList}
      </ul>
    );
  }
}

module.exports = {
  RecipeListContainer
};
