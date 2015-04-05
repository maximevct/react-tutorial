var React = require('react');

var UserStore  = require('../../stores/user.js');
var RightStore = require('../../stores/right.js');

var SignInForm = require('./user-form.jsx');
var UserList   = require('./list.jsx');

var InvalidCreate = React.createClass({
  render: function() {
    return (
      <div className="InvalidCreate">INVALID</div>
    );
  }
});

var InvalidModified = React.createClass({
  render: function() {
    return (
      <div>
        INVALID MODIFIED
      </div>
    );
  }
});

var UserBox = React.createClass({
  displayName: 'UserBox',
  loadUsers: function () {
    var self = this;
    var state = this.state;
    UserStore.getAll(function (users) {
      state.users = users;
      self.setState(state);
    });
  },
  loadRights: function () {
    var self = this;
    var state = this.state;
    RightStore.getAll(function (rights) {
      state.rights = rights;
      self.setState(state);
    });
  },
  handleSubmitCreate: function (user) {
    var self = this;
    var state = this.state;
    UserStore.create(user, function (userCreated) {
      if (!userCreated.id) {
        state.validCreate = <InvalidCreate />;
      }
      else {
        state.validCreate = <div />;
        state.users.push(userCreated);
      }
      self.setState(state);
    });
  },
  handleSubmitModify: function (user) {
    var self = this;
    var state = this.state;
    UserStore.update(user, function (userModified) {
      if (!userModified.id) {
        state.validCreate = <InvalidModified />;
      }
      else {
        for (var i = 0; i < state.users.length; i++) {
          if (state.users[i].id == userModified.id) {
            state.users[i] = userModified;
            state.validCreate = <div />;
            break;
          }
        }
      }
      self.setState(state);
    });
  },
  editUser: function (user) {
    this.state.editUser = <SignInForm
      title="Add new user"
      onSubmitUser={this.handleSubmitModify}
      submitValue="Modify"
      user={user}
      rights={this.state.rights} />;
    this.setState(this.state);
  },
  deleteUser: function (user) {
    var self = this;
    UserStore.delete(user, function (success) {
      if (success) {
        self.loadUsers();
      }
    });
  },
  getInitialState: function () {
    return {
      users : [],
      rights : [],
      validCreate : <div />,
      editUser : <div />
    };
  },
  componentWillMount: function () {
    this.loadRights();
  },
  componentDidMount: function () {
    this.loadUsers();
  },
  render: function () {
    return (
      <div className="row">
        <div className="col-lg-6">
          <UserList
            users={this.state.users}
            deleteUser={this.deleteUser}
            editUser={this.editUser}
          />
        </div>
        <div className="col-lg-6">
          <SignInForm
            onSubmitUser={this.handleSubmitCreate}
            submitValue="Sign in"
            rights={this.state.rights}
          />
          {this.state.validCreate}
        </div>
        <div className="col-lg-6">
          {this.state.editUser}
        </div>
      </div>
    );
  }
});

module.exports = UserBox;
