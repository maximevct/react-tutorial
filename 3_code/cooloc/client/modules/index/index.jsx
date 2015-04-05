/** @jsx React.DOM */
var React = require('react');

var MainTitle = require('../../generics/main-title.jsx');

var url = '/';
var name = 'Index';

var Index = React.createClass({
  displayName: 'Index',
  render: function () {
    return (
      <div className="container-fluid">
        <MainTitle title="Index" subtitle="Welcome"/>
      </div>
    );
  }
});

module.exports = {
  url : url,
  name : name,
  module : Index
};
