'use strict';

var Router        = require('react-router');
var React         = require('react');

var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route         = Router.Route;
var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var NotFound      = require('./modules/page-not-found/index.jsx');
var Index         = require('./modules/index/index.jsx');

var UserStore       = require('./stores/user.js');
var NavigationStore = require('./stores/navigation.js');

var AppMenu = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  loadMenuFromServer: function () {
    NavigationStore.get(function (result) {
      this.setState({
        links : result
      });
    }.bind(this));
  },
  getInitialState: function () {
    return { links : NavigationStore.getLocally() };
  },
  render: function () {
    var self = this;
    var appMenuLinkNodes = this.state.links.map(function (link, index) {
      var iconClass = 'fa fa-fw fa-' + link.icon_name;
      return (
        <li className={self.context.router.isActive(link.name) ? 'active' : ''} key={index}>
          <Link to={link.name} >
            <i className={iconClass}></i> {link.name}
          </Link>
        </li>
      );
    });
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to={'/'} className="navbar-brand">Cooloc</Link>
        </div>
        <div className="collapse navbar-collapse navbar-ex1-collapse">
          <ul className="nav navbar-nav side-nav">
            { appMenuLinkNodes }
          </ul>
        </div>
      </nav>
    );
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div id="wrapper">
        <AppMenu />
        <div id="page-wrapper">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

UserStore.init(function () {
  NavigationStore.get(function (result) {
    var defaultModule = null;
    for (var i = 0; i < result.length && defaultModule === null; i++) {
      if (result[i].url === '/')
        defaultModule = NavigationStore.getModule(result[i].name);
    }
    var routeLinks = result.map(function (link, index) {
      var module = NavigationStore.getModule(link.name);
      return (<Route name={module.name} path={module.url} handler={module.module} key={index} />);
    });

    var routes = (
      <Route name="App" path="/" handler={App}>
        { routeLinks }
        <DefaultRoute handler={defaultModule.module}/>
        <NotFoundRoute handler={NotFound.module}/>
      </Route>
    );

    Router.run(routes, function (Handler) {
      React.render(<Handler/>, document.body);
    });
  });
});
