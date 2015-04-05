var React = require('react');

var MainTitle = React.createClass({
  displayName: 'Main-Title',
  render: function () {
    return (
      <div className="row">
        <h1 className="page-header">
          {this.props.title} <small>{this.props.subtitle}</small>
        </h1>
      </div>
    );
  }
});

module.exports = MainTitle;
