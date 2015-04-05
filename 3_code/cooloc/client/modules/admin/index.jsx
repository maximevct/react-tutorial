/** @jsx React.DOM */
var React = require('react');

var MainTitle = require('../../generics/main-title.jsx');

var UserBox = require('./user.jsx');

var url = '/admin';
var name = 'Admin';

var Admin = React.createClass({
  displayName: 'Admin',
  render: function () {
    return (
      <div className="container-fluid">
        <MainTitle title="Admin" subtitle="Welcome"/>
        <UserBox />
      </div>
    );
  }
});

module.exports = {
  url : url,
  name : name,
  module : Admin
};
