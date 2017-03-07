var React = require('react');

var BaseLayout = require('../layouts/base.jsx').BaseLayout;
var Recipe = require('../models/recipe').Recipe;

class RecipeDetailContainer extends React.Component{
  constructor(props){
    super(props);

    var recipe = new Recipe();
    recipe.set('objectId', props.id);
    recipe.fetch().then(() => {
      this.setState({recipe: recipe});
    });

    this.state = {
      recipe: recipe
    };
  }
  render(){
    var recipe = this.state.recipe;

    return (
      <BaseLayout>
        <h1>{recipe.get('name')}</h1>
        <AdjustRecipe recipe={this.state.recipe} />
      </BaseLayout>
    )
  }
}

class AdjustRecipe extends React.Component {
  constructor(props){
    super(props);

    // bind this
    this.adjustRecipe = this.adjustRecipe.bind(this);

    this.state = {
      factor: 1
    };
  }
  adjustRecipe(servings){
    var factor = parseInt(servings) / this.props.recipe.get('servings');
    console.log(factor);
    this.setState({factor: factor});
  }
  render(){
    var ingredientList = this.props.recipe.get('ingredients').map((ingredient) => {
      return (
        <li key={ingredient.cid}>
          {ingredient.qtyDisplay(this.state.factor) + ' '}
          {ingredient.get('units') + ' '}
          {ingredient.get('name')}
        </li>
      )
    });
    console.log(this.props.recipe);

    return (
      <div className="well">

        <AdjustForm recipe={this.props.recipe} adjustRecipe={this.adjustRecipe}/>

        <ul>
          {ingredientList}
        </ul>

      </div>
    )
  }
}

class AdjustForm extends React.Component {
  constructor(props){
    super(props);

    // Bind this to methods
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleServingChange = this.handleServingChange.bind(this);

    this.state = {
      servings: this.props.recipe.get('servings')
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({servings: nextProps.recipe.get('servings')});
  }
  handleServingChange(e){
    this.setState({servings: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.adjustRecipe(this.state.servings);
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        Servings: <input onChange={this.handleServingChange} type="text" name="servings" value={this.state.servings}/>
        <input type="submit" value="Adjust"/>
      </form>
    );
  }
}


module.exports = {
  RecipeDetailContainer,
  AdjustRecipe
};
