var Backbone = require('backbone');
var React = require('react');

var BaseLayout = require('../layouts/base.jsx').BaseLayout;
var Recipe = require('../models/recipe').Recipe;
var User = require('../models/user').User;
var ParseFile = require('../models/file').ParseFile;

var name = 'Cool Guy';


class RecipeAddEditContainer extends React.Component{
  constructor(props){
    super(props);

    // bind this to methods
    this.saveRecipe = this.saveRecipe.bind(this);

    var recipe = new Recipe();

    if(this.props.id){
      recipe.set('objectId', this.props.id);
      recipe.fetch().then(() => {
        this.setState({recipe: recipe});
      });
    }

    this.state = {
      recipe: recipe
    };
  }
  saveRecipe(formData){
    var recipe = this.state.recipe;
    var user = User.current();

    console.log(formData);

    recipe.set({
      'name': formData.name,
      'servings': parseInt(formData.servings),
      'pic': formData.pic
      // 'image': formData.image
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
            <h1>{this.state.recipe.isNew() ? 'Add' : 'Edit'} Recipe</h1>

            <RecipeForm saveRecipe={this.saveRecipe} recipe={this.state.recipe}/>
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
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: this.props.recipe.get('name'),
      servings: this.props.recipe.get('servings'),
      image: this.props.recipe.get('image')
    };
    // this.state = this.props.recipe.toJSON();
  }
  componentWillReceiveProps(newProps){
    // this.setState(newProps.recipe.toJSON());
    this.setState({
      name: newProps.recipe.get('name'),
      servings: newProps.recipe.get('servings'),
      image: newProps.recipe.get('image')
    });
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
  handleImageChange(e){
    // step 1: get the file object from the form
    var imageData = e.target.files[0];

    // step 2: new parse model with the name set
    var image = new ParseFile();
    image.set({name: imageData.name});

    // step 3: ajax request to save image to the server
    image.save({}, {
      data: imageData,
      contentType: imageData.type
    }).then(() => {
      // step 4: save the image url to the recipe state
      this.setState({pic: image});
    });
  }
  render(){
    // http://tiny-parse-server.herokuapp.com/files/tiygvl/66f5ffb848524c019efecd7b8467275a_IMG_2221.JPG
    // var imageName = this.state.image

    return (
      <form enctype="multipart/form-data" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email-login">Name</label>
          <input onChange={this.handleNameChange} value={this.state.name} className="form-control" name="name" type="text" placeholder="Recipe Name" />
        </div>

        <div className="form-group">
          <label htmlFor="password-login">Servings</label>
          <input onChange={this.handleServingsChange} value={this.state.servings} className="form-control" name="servings" type="text" placeholder="How many servings does this make?" />
        </div>

        <div className="form-group">
          <label htmlFor="image">Amazing Food Photography</label>
          <input onChange={this.handleImageChange} filename={this.state.image} className="form-control" name="image" type="file" placeholder="Nice photo" />
        </div>

        <input className="btn btn-primary" type="submit" value={this.props.recipe.isNew() ? 'Add Recipe' : 'Edit Recipe'} />
      </form>
    )
  }
}

module.exports = {
  RecipeAddEditContainer
};
