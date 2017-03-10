var React = require('react');
var Backbone = require('backbone');
var User = require('../models/user').User;

class BaseLayout extends React.Component{
  render(){
    var pageClass = stripTrailingSlash(Backbone.history.fragment).replace('/', '-');

    return (
      <div className={pageClass}>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Batch Baker</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                {/* <NavItem url="/" name="Home"/>
                <NavItem url="auth/" name="Login"/>*/}
                <li className={activeClass('')}><a href="#">Home</a></li>
                <li className={activeClass('recipes/')}><a href="#recipes/">My Recipes</a></li>
                <li className={activeClass('auth/')}>{User.current() ? <a href="#logout/">Logout</a> : <a href="#auth/">Login</a> }</li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          {this.props.children}
        </div>

        <footer>
          Copyright &copy; 2017
        </footer>
      </div>
    )
  }
}

function isActive(url){
  return Backbone.history.fragment == url;
}

function activeClass(url){
  return isActive(url) ? 'active': '';
}

// http://stackoverflow.com/questions/6680825/return-string-without-trailing-slash
function stripTrailingSlash(str){
   if(str.charAt(str.length-1) == "/"){ str = str.substr(0, str.length - 1);}
   return str || 'home';
}

module.exports = {
  BaseLayout: BaseLayout
};
