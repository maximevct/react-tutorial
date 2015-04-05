'use strict'

var fs         = require('fs');
var path       = require('path');
var express    = require('express');
var bodyParser = require('body-parser');
var config     = require('./config');
var db         = require('./server/misc/database');
var auth       = require('./server/misc/auth');
var app        = express();
var mode       = 'dev';

app.use(express.static(__dirname + '/client/public'));
// app.use('/', auth);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

process.argv.forEach(function (val, index, array) {
  if (val === 'dev' || val === 'test' || val === 'prod')
    mode = val;
});

fs.readdir(path.join(__dirname, '/server/api'), function (err, files) {
  if (err) throw err;
  for (var i = 0; i < files.length; i++) {
    loadModule(files[i]);
  }
});

db.init(config[mode].database, function (err) {
  if (err) throw err;
  app.listen(config[mode].server.port);
  console.log('Server started: http://localhost:'+config[mode].server.port);
});


function loadModule(module) {
  var Module = require('./server/api/' + module + '/index.js');
  console.log('Route activated : ' + module);
  Module.init(app, db);
}
