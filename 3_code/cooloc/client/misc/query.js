'use strict'

var cookie = require('./cookie.js');

var COOKIE_TOKEN = 'userToken';

function createUrl(url, params) {
  var urlWithParams = url;
  var i = 0;
  for (var param in params) {
    urlWithParams += ((i++ == 0) ? '?' : '&') + param + '='+params[param];
  }
  return urlWithParams;
}

function executeQuery(method, url, data, done, token, async) {
  // console.log(method, url, data, token);
  $.ajax({
    url: url,
    async: async || true,
    headers: {
      'Authorization':'Basic ' + token,
    },
    method: method,
    data: data,
    success: done
  });
}

var query = module.exports = {
  _userToken : cookie.get(COOKIE_TOKEN),
  get : function (url, params, done) {
    if (typeof(done) === 'undefined') {
      done = params;
      params = {};
    }
    executeQuery('GET', createUrl(url, params), {}, done, this._userToken);
  },
  getSync : function (url, params, done) {
    if (typeof(done) === 'undefined') {
      done = params;
      params = {};
    }
    executeQuery('GET', createUrl(url, params), {}, done, this._userToken, false);
  },
  post : function (url, params, data, done) {
    if (typeof(done) === 'undefined') {
      done = params;
      params = {};
    }
    executeQuery('POST', createUrl(url, params), data, done, this._userToken);
  },
  put : function (url, params, data, done) {
    if (typeof(done) === 'undefined') {
      done = params;
      params = {};
    }
    executeQuery('PUT', createUrl(url, params), data, done, this._userToken);
  },
  delete : function (url, params, data, done) {
    if (typeof(done) === 'undefined') {
      done = params;
      params = {};
    }
    executeQuery('DELETE', createUrl(url, params), data, done, this._userToken);
  },
  deleteToken : function () {
    this._userToken = '';
    cookie.set(COOKIE_TOKEN, 0, 365);
  },
  setToken : function (token) {
    this._userToken = token;
    cookie.set(COOKIE_TOKEN, token, 365);
  }
};
