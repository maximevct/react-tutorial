var query            = require('../misc/query.js');
var cookie           = require('../misc/cookie.js');
var API              = '/user';
var _changeListeners = [];

var _user     = {};

var UserStore = module.exports = {
  init: function (done) {
    _user = {};
    query.get(API + '/from-token/', {}, function (res) {
      if (res.data.length > 0) {
        _user = res.data[0];
        query.setToken(_user.token);
        UserStore.notifyChange();
      }
      if (done) done(_user);
    });
  },
  login: function (user, done) {
    _user = {};
    query.deleteToken();
    query.post(API + '/token', {}, user, function (res) {
      if (res.data.length > 0) {
        _user = res.data[0];
        query.setToken(_user.token);
        location.href = '/';
      }
      if (done) done(_user);
    });
  },
  logout: function () {
    _user = {};
    query.deleteToken();
    location.href = '/';
  },
  signin: function (user, done) {
    _user = {};
    query.deleteToken();
    query.post(API + '/', {}, user, function (res) {
      if (res.data.length && res.data[0].token) {
        _user = res.data[0];
        query.setToken(_user.token);
        location.href = '/';
      }
      if (done) done(_user);
    });
  },
  getAll: function (done) {
    query.get(API + 's/', {}, function (res) {
      if (done) done(res.data);
    });
  },
  getUser: function () {
    return _user;
  },
  create: function (user, done) {
    query.post(API + '/', {}, user, function (res) {
      if (done) done((res.data.length && res.data[0].id) ? res.data[0] : {});
    });
  },
  update: function (user, done) {
    query.put(API + '/'+user.id, {}, user, function (res) {
      if (done) done((res.data.length && res.data[0].id) ? res.data[0] : {});
    });
  },
  delete: function (user, done) {
    query.delete(API + '/'+user.id, {}, {}, function (res) {
      if (done) done(res.data);
    });
  },
  isAuthentified: function () {
    return _user.id > 0;
  },
  getToken: function () {
    return _user.token;
  },
  getUser: function () {
    return _user;
  },
  verifUsername: function (user, done) {
    query.get(API + '/isset/username/' + user.username, {}, function (res) {
      if (done) done((res.data.length && res.data[0].id) ? res.data[0] : {});
    });
  },
  verifEmail: function (user, done) {
    query.get(API + '/isset/email/' + user.email, {}, function (res) {
      if (done) done((res.data.length && res.data[0].id) ? res.data[0] : {});
    });
  },
  notifyChange: function () {
    _changeListeners.forEach(function (listener) {
      listener();
    });
  },
  addChangeListener: function (listener) {
    _changeListeners.push(listener);
  },
  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    });
  }
};
