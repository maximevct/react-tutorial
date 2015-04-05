/** @jsx React.DOM */
var React     = require('react');
var UserStore = require('../../stores/user.js');

var name = 'Logout';
var url = '/logout';

var Logout = React.createClass({
  displayName: 'Logout',
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function () {
    console.log(UserStore.getUser());
    if (UserStore.isAuthentified())
      UserStore.logout();
  },
  render: function () {
    return (
      <div></div>
    );
  }
});

module.exports = {
  url : url,
  name : name,
  module : Logout
};
