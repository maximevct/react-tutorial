'use strict'

var _db = null;

var Message = {
  getHeaders : function (req, response) {
    _db.query('SELECT * FROM "Message"', function (err, res) {
      response.send({data : res});
    });
  }
};

exports.init = function (app, db) {
  _db = db;
  app.get('/messages/header', Message.getHeaders);
}
