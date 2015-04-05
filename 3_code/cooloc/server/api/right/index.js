'use strict'

var fs     = require('fs');
var _db    = null;

var sql = {};

var Right = {
  getAll : function (req, response) {
    _db.query(sql.getAll, function (err, res) {
      if (err) throw err;
      response.send({data : res});
    });
  },
  create : function (req, response) {
    var args = [
      req.body.name,
      req.body.level
    ];
    _db.query(sql.create, args, function (err, res) {
      if (err) throw err;
      response.send({data : res});
    });
  }
};

exports.init = function (app, db) {
  _db = db;
  sql = db.loadSql(__dirname, {
    create        : 'create.sql',
    getAll        : 'getAll.sql'
  });
  app.post('/right/' , Right.create);
  app.get('/rights/' , Right.getAll);
}
