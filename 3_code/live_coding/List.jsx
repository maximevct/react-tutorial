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

var AlertDanger = React.createClass({
  render: function() {
    return (
      <div className="alert alert-danger">
        <strong>Error : </strong>
        Number of users must be <code>{'0 < nbrUser <= 200'}</code> and is actually : {this.props.nbrUser}
      </div>
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
      isPendig : false,
      errorDiv : <div />
    };
  },
  getUsers: function (nbrUser) {
    if (nbrUser === undefined)
      nbrUser = this.state.nbrUser;
    if (!this.state.isPendig) {
      this.setState({ isPendig : true }, function () {
        $.get(this.props.url + '/' + nbrUser, function (res) {
          this.setState({ users : res, isPendig : false, nbrUser : res.length, errorDiv : <div /> });
        }.bind(this));
      }.bind(this));
    }
  },
  componentDidMount: function () {
    this.getUsers();
  },
  setErrorDiv: function (nbrUser) {
    this.setState({
      nbrUser : nbrUser,
      users : [],
      isPendig : false,
      errorDiv : <AlertDanger nbrUser={nbrUser} />
    });
  },
  handleChangeNumberUsers: function () {
    var nbrUser = React.findDOMNode(this.refs.nbrUser).value;
    if (nbrUser > 0 && nbrUser <= 200)
      this.getUsers(nbrUser);
    else
      this.setErrorDiv(nbrUser);
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
          {this.state.errorDiv}
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
