'use strict';

var React = require('react');

var Box   = require('./Box.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div id="wrapper">
        <div id="page-wrapper">
          <div className="container-fluid">
            <Box />
          </div>
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.body);
