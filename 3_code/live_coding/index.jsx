'use strict';
/** @jsx React.DOM */
var React = require('react');

var List = require('./List.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div id="wrapper">
        <div id="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <List />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.body);
