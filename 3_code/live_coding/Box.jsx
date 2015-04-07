'use strict';

var React    = require('react');

var ListUser = require('./List.jsx')

var UserBox = React.createClass({
  displayName: 'UserBox',
  render: function () {
    return (
      <div className="row">
        <ListUser />
      </div>
    );
  }
});

/**
 * Montrer un exemple de passage de fonction comme propriété pour intéragir entre composants
 * Comme dans le cas de création d'un formulaire par exmeple, les fonctions Handle devront ^etres crées dans cette Box et envoyée en props aux enfants
 */

module.exports = UserBox;
