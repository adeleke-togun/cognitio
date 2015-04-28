angular.module('cognitio.controllers')
.controller('HomeCtrl',
  ['$scope', '$state', 'Authentication',
    function($scope, $state, Authentication) {

      $scope.signOut = function() {
        console.log("it came with the boiler plate");
      };

      $scope.logout = function() {
        Authentication.logout();
        $state.go('login');
      };
    }
 ]);
