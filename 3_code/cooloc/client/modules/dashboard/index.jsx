/** @jsx React.DOM */
var React = require('react');

var MainTitle = require('../../generics/main-title.jsx');

var UserStore  = require('../../stores/user.js');

var name = 'Dashboard';
var url = '/';

var Dashboard = React.createClass({
  displayName: name,
  getInitialState: function () {
    return {
      user : {}
    };
  },
  componentWillMount: function () {
    this.state.user = UserStore.getUser();
    this.setState(this.state);
  },
  render: function () {
    return (
      <div className="container-fluid">
        <MainTitle title="Dashboard" subtitle={"Hello "+this.state.user.username}/>
      </div>
    );
  }
});

module.exports = {
  url : url,
  name : name,
  module : Dashboard
};
