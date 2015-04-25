/* define our modules */
angular.module('cognitio.services', ['firebase','ngCookies']);
angular.module('cognitio.filters', []);
angular.module('cognitio.directives', ['monospaced.elastic']);
angular.module('cognitio.controllers', []);

/* load services */
require('./js/services/authentication.js');
require('./js/services/refs.js');
require('./js/services/toast.js');
require('./js/services/users.js');
require('./js/services/authorization.js');
require('./js/services/assessment.js');
require('./js/services/submission.js');
require('./js/services/feedback.js');

/* load filters */
require('./js/filters/reverse.js');

/* load directives */
require('./js/directives/authorization.js');


/* load controllers */
require('./js/controllers/home.js');
require('./js/controllers/login.js');
require('./js/controllers/menu.js');
require('./js/controllers/users.js');


window.Cognitio = angular.module("Cognitio", [
  'ui.router',
  'cognitio.controllers',
  'cognitio.directives',
  'cognitio.filters',
  'cognitio.services'
]);

Cognitio.run(['$rootScope', '$state', 'Authentication', 'Refs', 'Toast','Authorization',
  function($rootScope, $state, Authentication, Refs, Toast, Authorization) {
  $rootScope._ = window._;
  $rootScope.moment = window.moment;
  $rootScope.authCallback = function(authData) {
    Authentication.auth(authData, function(user) {
      if(user) {
        //you can redirect a user here to the admin page by checking the serivice
        Toast('Welcome, ' + user.name + '!');
      }
      else {
        // logged out
        Authentication.logout();
        $state.go('login');
      }
    });
  };

  Refs.root.onAuth($rootScope.authCallback);
}]);

/* application routes */
Cognitio.config(['$stateProvider','$locationProvider',
 function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .state('logout', {
      url: '/logout',
      controller: ['Authentication', function(Authentication) {
        Authentication.logout();
      }]
    })
    .state('default', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'views/users.html',
      controller: 'UsersCtrl'
    })
    .state('users/id', {
      url: '/users/:userId',
      templateUrl: 'views/users.html',
      controller: 'UsersCtrl'
    });
}]);
