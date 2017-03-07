/**
 * Parse API setup utility
 */
var $ = require('jquery');

var parse = {
  serverURL: '',
  initialize: function(config){
    config = config || {};

    if(config.serverURL){
      this.serverURL = config.serverURL;
    }

    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "slumber");

        if(config.sessionId){
          xhr.setRequestHeader("X-Parse-Session-Token", config.sessionId);
        }
      }
    });
  }
}

module.exports = parse;
