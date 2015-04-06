'use strict';
/** @jsx React.DOM */
var React = require('react');

var i = 0;

var loading = function(action) {
  // add the overlay with loading image to the page
  if(action=="on"){
    var over = '<div id="overlay">' +
      '<img id="loading" src="http://bit.ly/pMtW1K" >' +
      '</div>';
    //$(over).appendTo('body');
    $('body').append(over);
    $('html, body').css("cursor", "wait");
  }
  else if(action=="off"){
    $("#overlay").remove();
    $('html, body').css("cursor", "auto");
  }
};

var List = React.createClass({
  displayName: 'List',
  getDefaultProps: function () {
    return {
      url : '/users'
    };
  },
  // Initialise l'état initial de notre composant
  getInitialState: function () {
    // Ajoute une fonction liée au scroll de la page
    window.addEventListener('scroll', this.handleScroll);
    // Initialise les variables de l'état initial
    return {
      users : [],
      loadingFlags : false
    };
  },
  getUsers: function () {
    var nextPage = this.state.page + 1;
    var state = this.state;
    var res = [];
    for (var j = 0; j < 10; i++, j++) {
      res.push({
        username : 'user_'+i,
        age: i * 10
      });
    }

    // $.get(this.props.url + '/' + this.state.page, function (res) {
      if (this.isMounted()) {
        state.users = res;
        state.loadingFlags = false;
        state.page = nextPage;
        this.setState(state);
        loading('off');
      }
    // }.bind(this));
  },
  componentDidMount: function () {
    loading('on');
    this.getUsers();
  },
  handleScroll: function () {
    var wHeight = $(window).height();
    var inHeight = window.innerHeight;
    var scrollT = $(window).scrollTop();
    var totalScrolled = scrollT + inHeight;
    if (totalScrolled + 100 > wHeight) {
      if (!this.state.loadingFlags) {
        this.setState({
          loadingFlags : true
        });
        loading('on');
        this.getUsers();
      }
    }
  },
  // Affiche le rendu
  render: function () {
    var UserNode = this.state.users.map(function (user) {
      return (
        <div>
          Username : {user.username}<br />
          Age : {user.age}<hr />
        </div>
      );
    });
    return (
      <div>
        List
        {UserNode}
      </div>
    );
  }
});

module.exports = List;
