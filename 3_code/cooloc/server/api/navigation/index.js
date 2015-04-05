'use strict'

var fs  = require('fs');
var _db = null;

var sql = {};

var Navigation = {
  get : function (req, response) {
    var tab = /Basic (\w+)/.exec(req.headers.authorization);
    var userToken = '';
    if (tab && tab[1])
      userToken = tab[1];
    var args = [
      userToken
    ];
    _db.query(sql.get, args, function (err, res) {
      if (err) throw err;
      response.send({data : res});
    });
  }
};

exports.init = function (app, db) {
  _db = db;
  sql = db.loadSql(__dirname, {
    get : 'get.sql'
  });
  app.get('/navigations', Navigation.get);
}
