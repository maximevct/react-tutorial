var React     = require('react');

var UserStore = require('../../stores/user.js');

var emailRegexValidator = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

var status = [
  { code : 'EMPTY'        , classStatus : ''            },
  { code : 'TOO_SHORT'    , classStatus : 'has-error'   },
  { code : 'TAKEN'        , classStatus : 'has-error'   },
  { code : 'VALID'        , classStatus : 'has-success' },
  { code : 'MISSMATCH'    , classStatus : 'has-error'   },
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
  getInitialState: function () {
    return {
      user : {
        email     : '',
        username  : '',
        password  : ''
      },
      valid : {
        username      : getStatus('EMPTY'),
        email         : getStatus('EMPTY'),
        emailVerif    : getStatus('EMPTY'),
        password      : getStatus('EMPTY'),
        passwordVerif : getStatus('EMPTY')
      },
      verif : {
        email : '',
        password : ''
      }
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
      UserStore.verifUsername(this.state.user, function (issetUser) {
        state.valid.username = issetUser ? getStatus('TAKEN') : getStatus('VALID');
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
      this.handleChangeVerifEmail(null, state);
    }
    else {
      UserStore.verifEmail(this.state.user, function (issetUser) {
        state.valid.email = issetUser ? getStatus('TAKEN') : getStatus('VALID');
        self.handleChangeVerifEmail(null, state);
      });
    }
  },
  handleChangeVerifEmail: function (e, state) {
    var _state, email;
    if (state) {
      _state = state;
      email = state.verif.email;
    }
    else {
      _state = this.state;
      _state.verif.email = e.target.value;
    }
    _state.valid.emailVerif = _state.verif.email === _state.user.email ? getStatus('VALID') : getStatus('MISSMATCH');
    this.setState(_state);
  },
  handleChangePassword: function (e) {
    var password = e.target.value;
    var state = this.state;
    var self = this;
    state.user.password = password;
    state.valid.password = password.length < 6 ? getStatus('TOO_SHORT') : getStatus('VALID');
    this.handleChangeVerifPassword(null);
  },
  handleChangeVerifPassword: function (e) {
    var state = this.state;
    if (e !== null) {
      var password = e.target.value;
      state.verif.password = password;
    }
    state.valid.passwordVerif = state.verif.password === state.user.password ? getStatus('VALID') : getStatus('MISSMATCH');
    this.setState(state);
  },
  handleSubmit: function (e) {
    e.preventDefault();
    for (var item in this.state.valid) {
      if (this.state.valid[item] !== getStatus('VALID'))
        return;
    }
    this.props.handleSubmit(this.state.user);
  },
  render: function () {
    var classValidUserName      = 'form-group ' + this.state.valid.username.classStatus;
    var classValidEmail         = 'form-group ' + this.state.valid.email.classStatus;
    var classValidEmailVerif    = 'form-group ' + this.state.valid.emailVerif.classStatus;
    var classValidPassword      = 'form-group ' + this.state.valid.password.classStatus;
    var classValidPasswordVerif = 'form-group ' + this.state.valid.passwordVerif.classStatus;
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className={classValidUserName}>
          <label className="col-sm-2 control-label" htmlFor="username-sign-in">Username</label>
          <div className="col-sm-10">
            <input className="form-control" type="text" id="username-sign-in" placeholder="Username" value={this.state.user.username} onChange={this.handleChangeUsername}/>
          </div>
        </div>
        <div className={classValidEmail}>
          <label className="col-sm-2 control-label" htmlFor="email-sign-in">Email</label>
          <div className="col-sm-10">
            <input className="form-control" type="email" id="email-sign-in" placeholder="Email" value={this.state.user.email} onChange={this.handleChangeEmail}/>
          </div>
        </div>
        <div className={classValidEmailVerif}>
          <label className="col-sm-2 control-label" htmlFor="email-verif-sign-in">Email Verification</label>
          <div className="col-sm-10">
            <input className="form-control" type="email" id="email-verif-sign-in" placeholder="Email (Verification)" value={this.state.verif.email} onChange={this.handleChangeVerifEmail}/>
          </div>
        </div>
        <div className={classValidPassword}>
          <label className="col-sm-2 control-label" htmlFor="password-sign-in">Password</label>
          <div className="col-sm-10">
            <input className="form-control" type="password" id="password-sign-in" placeholder="Password" value={this.state.user.password} onChange={this.handleChangePassword}/>
          </div>
        </div>
        <div className={classValidPasswordVerif}>
          <label className="col-sm-2 control-label" htmlFor="password-verif-sign-in">Password Verification</label>
          <div className="col-sm-10">
            <input className="form-control" type="password" id="password-verif-sign-in" placeholder="Password (Verification)" value={this.state.verif.password} onChange={this.handleChangeVerifPassword}/>
          </div>
        </div>
        <button type="submit" className="btn btn-default">Sign In</button>
      </form>
    );
  }
});

module.exports = SignInForm;

