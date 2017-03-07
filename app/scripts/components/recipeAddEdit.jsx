var Backbone = require('backbone');
var React = require('react');

var BaseLayout = require('../layouts/base.jsx').BaseLayout;
var Recipe = require('../models/recipe').Recipe;
var User = require('../models/user').User;

class RecipeAddEditContainer extends React.Component{
  constructor(props){
    super(props);

    this.saveRecipe = this.saveRecipe.bind(this);
  }
  saveRecipe(formData){
    var recipe = new Recipe();
    var user = User.current();

    recipe.set({
      'name': formData.name,
      'servings': parseInt(formData.servings)
    });

    recipe.setPointer('owner', '_User', user.get('objectId'));

    recipe.save().then(function(){
      Backbone.history.navigate('recipes/', {trigger: true});
    });
  }
  render(){
    return (
      <BaseLayout>
        <div className="row">
          <div className="col-md-12">
            <h1>Add Recipe</h1>

            <RecipeForm saveRecipe={this.saveRecipe} />
          </div>
        </div>
      </BaseLayout>
    )
  }
}

class RecipeForm extends React.Component{
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleServingsChange = this.handleServingsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      servings: ''
    };
  }
  handleNameChange(e){
    this.setState({name: e.target.value});
  }
  handleServingsChange(e){
    this.setState({servings: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    // input data.... this.state
    this.props.saveRecipe(this.state);
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email-login">Name</label>
          <input onChange={this.handleNameChange} className="form-control" name="name" type="text" placeholder="Recipe Name" />
        </div>

        <div className="form-group">
          <label htmlFor="password-login">Servings</label>
          <input onChange={this.handleServingsChange} className="form-control" name="servings" type="text" placeholder="How many servings does this make?" />
        </div>

        <input className="btn btn-primary" type="submit" value="Save" />
      </form>
    )
  }
}

module.exports = {
  RecipeAddEditContainer
};
