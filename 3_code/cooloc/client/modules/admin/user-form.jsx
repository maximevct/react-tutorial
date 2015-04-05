var React     = require('react');

var UserStore = require('../../stores/user.js');

var cbCount = 0;

var emailRegexValidator = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

var status = [
  { code : 'EMPTY'        , classStatus : ''            },
  { code : 'TOO_SHORT'    , classStatus : 'has-error'   },
  { code : 'TAKEN'        , classStatus : 'has-error'   },
  { code : 'VALID'        , classStatus : 'has-success' },
  { code : 'INVALID_EMAIL', classStatus : 'has-error'   }
];

function getStatus(value) {
  for (var i = 0; i < status.length; i++)
    if (status[i].code === value)
      return status[i];
  return status[0];
}

var SignInForm = React.createClass({
  displayName: 'SignInForm',
  getDefaultProps: function () {
    return {
      title : 'Subscribtion',
      user : {
        id        : '',
        email     : '',
        username  : '',
        password  : '',
        id_right  : 2
      }
    };
  },
  getInitialState: function () {
    var user        = this.props.user;
    var valid       = {
      username  : getStatus('EMPTY'),
      email     : getStatus('EMPTY'),
      password  : getStatus('EMPTY')
    };
    return {
      id          : ++cbCount,
      user        : user,
      valid       : valid
    };
  },
  handleChangeUsername: function (e) {
    var username = e.target.value;
    var state = this.state;
    var self = this;
    state.user.username = username;
    if (username.length < 3) {
      state.valid.username = getStatus('TOO_SHORT');
      this.setState(state);
    }
    else {
      UserStore.verifUsername(this.state.user, function (user) {
        var isValid = !user.id || (user.id === state.user.id);
        state.valid.username = isValid ? getStatus('VALID') : getStatus('TAKEN');
        self.setState(state);
      });
    }
  },
  handleChangeEmail: function (e) {
    var email = e.target.value;
    var state = this.state;
    var self = this;
    state.user.email = email;
    if (!emailRegexValidator.test(email)) {
      state.valid.email = getStatus('INVALID_EMAIL');
      this.setState(state);
    }
    else {
      UserStore.verifEmail(this.state.user, function (user) {
        var isValid = !user.id || (user.id === state.user.id);
        state.valid.email = isValid ? getStatus('VALID') : getStatus('TAKEN');
        self.setState(state);
      });
    }
  },
  handleChangePassword: function (e) {
    var password = e.target.value;
    var state = this.state;
    var self = this;
    state.user.password = password;
    state.valid.password = password.length < 6 ? getStatus('TOO_SHORT') : getStatus('VALID');
    this.setState(state);
  },
  handleChangeIdRight: function (e) {
    var id_right = e.target.value;
    var state = this.state;
    var self = this;
    state.user.id_right = id_right;
    this.setState(state);
  },
  handleSubmit: function (e) {
    e.preventDefault();
    this.props.onSubmitUser(this.state.user);
  },
  componentWillReceiveProps: function (nextProps) {
    this.state.user = nextProps.user;
  },
  render: function () {
    var classValidUserName      = 'form-group ' + this.state.valid.username.classStatus;
    var classValidEmail         = 'form-group ' + this.state.valid.email.classStatus;
    var classValidPassword      = 'form-group ' + this.state.valid.password.classStatus;
    var rightFields = this.props.rights.map(function (right, index) {
      return (<option value={right.id} key={index}>{right.name}</option>);
    });
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className={classValidUserName}>
              <label className="col-sm-2 control-label" htmlFor={"username-sign-in-"+this.state.id}>Username</label>
              <div className="col-sm-10">
                <input className="form-control" type="text" id={"username-sign-in-"+this.state.id} placeholder="Username" value={this.state.user.username} onChange={this.handleChangeUsername}/>
              </div>
            </div>
            <div className={classValidEmail}>
              <label className="col-sm-2 control-label" htmlFor={"email-sign-in-"+this.state.id}>Email</label>
              <div className="col-sm-10">
                <input className="form-control" type="email" id={"email-sign-in-"+this.state.id} placeholder="Email" value={this.state.user.email} onChange={this.handleChangeEmail}/>
              </div>
            </div>
            <div className={classValidPassword}>
              <label className="col-sm-2 control-label" htmlFor={"password-sign-in-"+this.state.id}>Password</label>
              <div className="col-sm-10">
                <input className="form-control" type="password" id={"password-sign-in-"+this.state.id} placeholder="Password" value={this.state.user.password} onChange={this.handleChangePassword}/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">Right</label>
              <div className="col-sm-10">
                <select className="form-control" value={this.state.user.id_right} onChange={this.handleChangeIdRight}>
                  {rightFields}
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-default">{this.props.submitValue}</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = SignInForm;

