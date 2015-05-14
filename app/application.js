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
require('./js/controllers/submit.js');
require('./js/controllers/view-assessment.js');
require('./js/controllers/view-submitted-assessment.js');


window.Cognitio = angular.module("Cognitio", [
  'ui.router',
  'ngFileUpload',
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
        // check if admin, else continue as user
        Authorization.isAuthorized().then(function(admin) {
          if(admin) {
            $state.go('admin');
          }
        });

        //you can redirect a user here to the admin page by checking the service
        Toast('Welcome, ' + user.name + '!');
        toastr.success('Welcome, ' + user.name + '!');
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

//Toastr setup options
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "800",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }

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
      controller: ['Authentication', '$state', '$rootScope', function (Authentication, $state, $rootScope) {
        Authentication.logout();
        $state.go('login');
        $rootScope.showPage();
      }]
    })
    .state('home', {
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
    })
    .state('submit', {
      url: '/submit',
      templateUrl: 'views/submit.html',
      controller: 'SubmitCtrl'
    })
    .state('view assessment', {
      url: '/view-assessment',
      templateUrl: 'views/view-assessment.html',
      controller: 'viewAssesmentCtrl'
    })
    .state('submitted', {
      url: '/view-assessment/:assessmentId',
      templateUrl: 'views/view-submitted-assesment.html',
      controller: 'viewSubmittedAssesmentCtrl'
    });
}]);
