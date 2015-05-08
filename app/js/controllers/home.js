angular.module('cognitio.controllers')
.controller('HomeCtrl',
  ['$scope', '$state', 'Authentication',
    function($scope, $state, Authentication) {
      console.log("Which kain witch craft?");
      $scope.logout = function() {
        Authentication.logout();
        $state.go('login');
      };
    }
 ]);
