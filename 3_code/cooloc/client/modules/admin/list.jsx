var React = require('react');

var User = React.createClass({
  render: function() {
    var user = this.props.user;
    var dateConnect = new Date(user.date_last_connect).toLocaleString();
    var dateSubscribed = new Date(user.date_subscribed).toLocaleString();
    return (
      <tr className="user">
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{dateConnect}</td>
        <td>{dateSubscribed}</td>
        <td>{user.right}</td>
        <td><a onClick={this.props.editUser.bind(null, user)}><i className="fa fa-edit"></i></a></td>
        <td><a onClick={this.props.deleteUser.bind(null, user)}><i className="fa fa-remove"></i></a></td>
      </tr>
    );
  }
});

var UserList = React.createClass({
  displayName: 'UserList',
  render: function () {
    var self = this;
    var userNodes = this.props.users.map(function(user, index) {
      return (
        <User user={user} key={index} editUser={self.props.editUser} deleteUser={self.props.deleteUser} />
      );
    });
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>DateLastLogin</th>
              <th>DateSubscribed</th>
              <th>Right</th>
              <th>Detail</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userNodes}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = UserList;
