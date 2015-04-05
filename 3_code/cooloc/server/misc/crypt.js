var crypto = require('crypto');

var crypt = module.exports = {
  sha1 : function (toHash) {
    if (!toHash)
      return '';
    var shasum = crypto.createHash('sha1');
    shasum.update(toHash);
    return shasum.digest('hex');
  }
};
