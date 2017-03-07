var React = require('react');
var Backbone = require('backbone');

var BaseLayout = require('../layouts/base.jsx').BaseLayout;
var User = require('../models/user').User;

class AuthContainer extends React.Component{
  constructor(props){
    super(props);

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);

  }
  login(formData){
    User.login(formData, function(){
      Backbone.history.navigate('recipes/', {trigger: true});
    });
  }
  signup(formData){
    User.signup(formData, function(){
      Backbone.history.navigate('recipes/', {trigger: true});
    });
  }
  render(){
    return (
      <BaseLayout>
        <div className="row">
          <div className="col-md-6">
            <h1>Login</h1>
            <AuthForm submitBtn="Login" action={this.login}/>
          </div>

          <div className="col-md-6">
            <h2>Sign Up</h2>
            <AuthForm submitBtn="Sign Up!" action={this.signup}/>
          </div>
        </div>
      </BaseLayout>
    )
  }
}

class AuthForm extends React.Component {
  constructor(props){
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }
  handleEmailChange(e){
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    // input data.... this.state
    this.props.action(this.state);
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email-login">Email address</label>
          <input onChange={this.handleEmailChange} className="form-control" name="email" id="email-login" type="email" placeholder="email" />
        </div>

        <div className="form-group">
          <label htmlFor="password-login">Password</label>
          <input onChange={this.handlePasswordChange} className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
        </div>

        <input className="btn btn-primary" type="submit" value={this.props.submitBtn} />
      </form>
    )
  }
}

module.exports = {
  AuthContainer
};
