'use strict'

var Task = {
  getHeaders : function (req, res) {
    var data = [{
      name : 'Task 1',
      completed : '40'
    }];
    res.send({data : data});
  }
};

exports.init = function (app) {
  app.get('/tasks/header', Task.getHeaders);
}
