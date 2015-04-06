'use strict';

var React = require('react');

var User = React.createClass({
  displayName: 'User',
  render: function() {
    var user = this.props.user;
    var birthdate = new Date(user.birthdate).toLocaleString();
    return (
      <tr>
        <td>{user.id}</td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{birthdate}</td>
        <td>{user.email}</td>
      </tr>
    );
  }
});

var List = React.createClass({
  displayName: 'List',
  getDefaultProps: function () {
    return {
      url : '/users'
    };
  },
  getInitialState: function () {
    return {
      users : [],
      nbrUser : 10,
      isPendig : false
    };
  },
  getUsers: function () {
    if (!this.state.isPendig) {
      this.setState({ isPendig : true }, function () {
        $.get(this.props.url + '/' + this.state.nbrUser, function (res) {
          this.setState({ users : res, isPendig : false, nbrUser : res.length });
        }.bind(this));
      }.bind(this));
    }
  },
  componentDidMount: function () {
    this.getUsers();
  },
  handleChangeNumberUsers: function () {
    var nbrUser = React.findDOMNode(this.refs.nbrUser).value;
    if (nbrUser < 1)
      nbrUser = 10;
    this.setState({ nbrUser : nbrUser }, function () {
      this.getUsers();
    }.bind(this));
  },
  render: function () {
    var UserNode = this.state.users.map(function (user, index) {
      return (
        <User user={user} key={index} />
      );
    });
    return (
      <div className="panel panel-default">
        <div className="panel-heading">User List</div>
        <div className="panel-body">
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={this.handleChangeNumberUsers}><span className="glyphicon glyphicon-refresh"></span></button>
            </span>
            <input type="number" className="form-control" onChange={this.handleChangeNumberUsers} placeholder="Number of users" value={this.state.nbrUser} ref="nbrUser" />
          </div>
        </div>
        <table className="table table-hover table-stripped">
          <thead>
            <tr>
              <th>#</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Birthdate</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {UserNode}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = List;
