angular.module('cognitio.controllers')
.controller('HomeCtrl',
  ['$scope', '$state', 'Authentication',
    function($scope, $state, Authentication) {

      $scope.showMenu = function($event) {

      };

      $scope.logout = function() {
        Authentication.logout();
        $state.go('login');
      };
    }
 ]);
