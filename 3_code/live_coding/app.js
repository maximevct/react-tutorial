'use strict'

var fs         = require('fs');
var path       = require('path');
var express    = require('express');
var bodyParser = require('body-parser');
var chance     = require('chance').Chance();
var app        = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/users/:limit', function (req, res) {
  var users = [];
  var limit = req.params.limit;
  if (limit <= 0)
    limit = 10;
  if (limit > 200)
    limit = 200;
  for (var i = 0; i < limit; i++)
    users.push({
      id        : i,
      firstname : chance.first(),
      lastname  : chance.last(),
      birthdate : chance.birthday(),
      email     : chance.email()
    });
  res.send(users);
});

app.listen(3005);
console.log('Server started: http://localhost:'+3005);
