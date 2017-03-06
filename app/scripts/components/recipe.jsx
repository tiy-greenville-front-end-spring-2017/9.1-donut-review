var React = require('react');

class RecipeAdjuster extends React.Component {
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
  RecipeAdjuster
};
