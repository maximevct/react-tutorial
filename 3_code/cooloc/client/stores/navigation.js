var fs = require('fs');

var query            = require('../misc/query.js');
var cookie           = require('../misc/cookie.js');
var UserStore        = require('./user.js');

var API              = '/navigations';
var _changeListeners = [];

var clientLinks         = [
  { name : 'Index'    , module : require('../modules/index/index.jsx')      },
  { name : 'Admin'    , module : require('../modules/admin/index.jsx')      },
  { name : 'Login'    , module : require('../modules/login/index.jsx')      },
  { name : 'Logout'   , module : require('../modules/logout/index.jsx')     },
  { name : 'Dashboard', module : require('../modules/dashboard/index.jsx')  },
  { name : 'SignIn'   , module : require('../modules/signin/index.jsx')     }
];

var _links           = [];

var NavigationStore = module.exports = {
  get: function (done) {
    _links = [];
    query.get(API, function (result) {
      for (var i = 0; i < result.data.length; i++)
        _links.push(result.data[i]);
      NavigationStore.notifyChange();
      if (done) done(_links);
    });
  },
  getLocally: function (done) {
    return _links;
    if (done) done(_links);
  },
  notifyChange: function () {
    _changeListeners.forEach(function (listener) {
      listener();
    });
  },
  setLinks : function (links) {
    _links = links;
  },
  getModule : function (name) {
    for (var i = 0; i < clientLinks.length; i++)
      if (clientLinks[i].name === name)
        return clientLinks[i].module;
    return null;
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
