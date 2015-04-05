'use strict'

var fs     = require('fs');
var crypt  = require('../../misc/crypt.js');
var _db    = null;

var sql = {};

var User = {
  getToken : function (req, response) {
    var args = [
      req.body.username,
      crypt.sha1(req.body.password)
    ];
    _db.query(sql.getToken, args, function (err, res) {
      if (err) throw err;
      response.send({data : res});
    });
  },
  getFromToken : function (req, response) {
    var tab = /Basic (\w+)/.exec(req.headers.authorization);
    var userToken = '';
    if (tab && tab[1])
      userToken = tab[1];
    _db.query(sql.getFromToken, [userToken], function (err, res) {
      if (err) throw err;
      response.send({data : res});
    });
  },
  getAll : function (req, response) {
    _db.query(sql.getAll, function (err, res) {
      if (err) throw err;
      response.send({data : res});
    });
  },
  create : function (req, response) {
    var user = {
      username  : req.body.username,
      email     : req.body.email,
      password  : crypt.sha1(req.body.password),
      id_right  : req.body.id_right || 2
    };
    for (var item in user)
      if (!user[item])
        return response.send({data : []});
    _db.query(sql.create, user, function (err, res) {
      if (err) throw err;
      response.send({data : res});
    });
  },
  issetUsername : function (req, response) {
    var args = [
      req.params.username
    ];
    _db.query(sql.issetUsername, args, function (err, res) {
      if (err) throw err;
      response.send({data : res});
    });
  },
  delete : function (req, response) {
    var args = [
      req.params.idUser
    ];
    _db.query(sql.delete, args, function (err, res) {
      if (err) throw err;
      response.send({data : res});
    });
  },
  update : function (req, response) {
    var args = [
      req.params.idUser,
      req.body.username,
      req.body.email,
      crypt.sha1(req.body.password),
      req.body.id_right || 'default'
    ];
    _db.query(sql.update, args, function (err, res) {
      if (err) throw err;
      response.send({data : res});
    });
  },
  issetEmail : function (req, response) {
    var args = [
      req.params.email
    ];
    _db.query(sql.issetEmail, args, function (err, res) {
      if (err) throw err;
      response.send({data : res});
    });
  }
};

exports.init = function (app, db) {
  _db = db;
  sql = db.loadSql(__dirname, {
    getToken      : 'getToken.sql',
    create        : 'create.sql',
    delete        : 'delete.sql',
    update        : 'update.sql',
    issetUsername : 'issetUsername.sql',
    issetEmail    : 'issetEmail.sql',
    getFromToken  : 'getFromToken.sql',
    getAll        : 'getAll.sql'
  });
  app.post('/user/token'                  , User.getToken);
  app.post('/user/'                       , User.create);
  app.get('/user/isset/username/:username', User.issetUsername);
  app.get('/user/isset/email/:email'      , User.issetEmail);
  app.get('/user/from-token/'             , User.getFromToken);
  app.get('/users/'                       , User.getAll);
  app.delete('/user/:idUser'              , User.delete);
  app.put('/user/:idUser'                 , User.update);
}
