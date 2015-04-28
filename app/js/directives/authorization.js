// this is a directive to check if a logged in user is admin else it redirects to login include in the admin pages
angular.module('cognitio.directives')
  .directive('isAuthorized', function() {
    return {
      restrict: 'EA',
      controller: ['$scope', 'Authorization', '$location', '$rootScope',
        function($scope, Authorization, $location, $rootScope) {
        Authorization.isAuthorized().then(function(admin) {
          $rootScope.showPage = true;
          if(!admin) {
            // window.location.pathname = '/login';
          }
          else{
            $scope.showPage = true;
          }
        }, function (err) {
          $rootScope.showPage = false;
          $location.path('/');
        });
      }]
    };
  });
