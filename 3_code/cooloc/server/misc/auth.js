'use strict'

var db        = require('./database');
var basicAuth = require('basic-auth');
var crypto    = require('crypto');
var shasum    = crypto.createHash('sha1');

module.exports = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.redirect('/');
  };
  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };
  shasum.update(user.pass);
  var password = shasum.digest('hex');
  db.query('SELECT id FROM "User" WHERE username LIKE($1) AND password LIKE($2)', [user.name, password], function (err, res) {
    console.log(res);
    if (res.length == 1)
      return next();
    return unauthorized(res);
  });
};
