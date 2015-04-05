var query            = require('../misc/query.js');
var API              = '/right';
var _changeListeners = [];

var _rights = [];

var RightStore = module.exports = {
  getAll: function (done) {
    query.get(API + 's/', {}, function (res) {
      if (done) done(res.data);
    });
  },
  create: function (right, done) {
    query.post(API + '/', {}, right, function (res) {
      notifyChange();
      if (done) done((res.data.length && res.data[0].token) ? res.data[0] : {});
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
