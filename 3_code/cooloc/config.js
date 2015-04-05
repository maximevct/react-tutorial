'use strict'

module.exports = {
  prod : {},
  dev : {
    database : {
      username : 'twiggeek',
      password : '123456',
      host : 'localhost',
      port : 5432,
      dbname : 'cooloc',
    },
    server : {
      port : 3005
    }
  },
  test : {}
};
