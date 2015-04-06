'use strict';

var React    = require('react');

var ListUser = require('./List.jsx')

var UserBox = React.createClass({
  displayName: 'UserBox',
  render: function () {
    return (
      <div className="row">
        <ListUser />
      </div>
    );
  }
});

module.exports = UserBox;
