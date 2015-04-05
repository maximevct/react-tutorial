'use strict'

var pg       = require('pg');
var fs       = require('fs');
var pgClient = null;

require('pg-spice').patch(pg);

var db = module.exports = {
  init : function (config, done) {
    var conString = 'pg://' + config.username
                  + ':' + config.password
                  + '@localhost:' + config.port
                  + '/' + config.dbname;
    pg.connect(conString, function(err, client, callback) {
      if(err) return done(err);
      pgClient = client;
      console.log('connect db');
      return done(null);
    });
  },
  loadSql : function (dir, files) {
    var sqls = {};
    for (var file in files)
      sqls[file] = fs.readFileSync(dir + '/' + files[file]).toString();
    return sqls;
  },
  query : function (query, args, done) {
    if (pgClient === null) return 'Not connected to PG';
    if (typeof(args) === 'function') {
      done = args;
      args = null;
    }
    pgClient.query(query, args, function (err, res) {
      var data = [];
      if (err)
        console.error(err);
      else
        data = res.rows;
      if (done)
        return done(null, data);
    })
  }
}
