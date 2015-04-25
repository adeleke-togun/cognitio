// this is a directive to check if a logged in user is admin else it redirects to login include in the admin pages
angular.module('cognitio.directives')
  .directive('isAuthorized', function() {
    return {
      restrict: 'EA',
      controller: ['$scope', 'Authorization',
        function($scope, Authorization) {
        console.log('got here into Authorization');
        // checks to see if logged in user is an admin use is-authorized ng-show='showPage' on all admin pages
        Authorization.isAuthorized().then(function(admin) {
          if(!admin) {
            // window.location.pathname = '/login';
          }
          else{
            $scope.showPage = true;
          }
        });
      }]
    };
  });