/** @jsx React.DOM */
var React     = require('react');

var MainTitle = require('../../generics/main-title.jsx');

var UserStore = require('../../stores/user.js');

var name = 'Login';
var url = '/login';

var InvalidLogin = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-lg-6">
          PERDU !
        </div>
      </div>
    );
  }
});

var Login = React.createClass({
  displayName: name,
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
    return {
      user : {
        username  : '',
        password  : ''
      },
      valid : <div />
    };
  },
  handleChangeUsername: function (e) {
    this.state.user.username = e.target.value;
    this.setState(this.state);
  },
  handleChangePassword: function (e) {
    this.state.user.password = e.target.value;
    this.setState(this.state);
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var self = this;
    UserStore.login(this.state.user, function (user) {
      if (!user.id) {
        self.state.valid = <InvalidLogin />;
        self.setState(self.state);
      }
    });
  },
  render: function () {
    return (
      <div className="container-fluid">
        <MainTitle title="Login" subtitle="Acces to your dashboard"/>
        <div className="row">
          <div className="col-lg-6">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>

              <div className="form-group">
                <label className="col-sm-2 control-label" htmlFor="username-log-in">Username</label>
                <div className="col-sm-10">
                  <input className="form-control" type="text" id="username-log-in" placeholder="Username" value={this.state.user.username} onChange={this.handleChangeUsername}/>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label" htmlFor="password-log-in">Password</label>
                <div className="col-sm-10">
                  <input className="form-control" type="password" id="password-log-in" placeholder="Password" value={this.state.user.password} onChange={this.handleChangePassword}/>
                </div>
              </div>

              <button type="submit" className="btn btn-default">Log In</button>
            </form>
          </div>
        </div>
        {this.state.valid}
      </div>
    );
  }
});

module.exports = {
  url : url,
  name : name,
  module : Login
};
