/** @jsx React.DOM */
var React      = require('react');
var MainTitle  = require('../../generics/main-title.jsx');

var SignInForm = require('./form.jsx');
var UserStore  = require('../../stores/user.js');

var url = '/signin';
var name = 'SignIn';

var InvalidSignIn = React.createClass({
  render: function() {
    return (
      <div className="col-lg-6">INVALID</div>
    );
  }
});

var SignIn = React.createClass({
  displayName: 'SignIn',
  getInitialState: function () {
    return {
      valid : <div />
    };
  },
  handleSubmit: function (user) {
    var self = this;
    UserStore.signin(user, function (user) {
      if (user.id) {
        self.state.valid = <InvalidSignIn />;
        self.setState(self.state);
      }
    });
  },
  render: function() {
    return (
      <div className="container-fluid">
        <MainTitle title="Sign in" subtitle="Come join us !"/>
        <div className="row">
          <div className="col-lg-6">
            <SignInForm handleSubmit={this.handleSubmit}/>
          </div>
          {this.state.valid}
        </div>
      </div>
    );
  }
});

module.exports = {
  url : url,
  name : name,
  module : SignIn
};
