'use strict';

var React = require('react');

var List   = require('./List.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div id="wrapper">
        <div id="page-wrapper">
          <div className="container-fluid">
            <List />
          </div>
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.body);
