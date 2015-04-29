angular.module('cognitio.controllers')
.controller('HomeCtrl',
  ['$scope', '$state', 'Authentication',
    function($scope, $state, Authentication) {

    window.setTimeout(function() {
      console.log($scope.currentUser);
    }, 3000);

      $scope.logout = function() {
        Authentication.logout();
        $state.go('login');
      };
    }
 ]);
