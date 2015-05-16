angular.module('cognitio.controllers')
  .controller('AdminHomeCtrl', ['$scope', '$state', 'Authentication',
    function($scope, $state, Authentication) {
    
      $scope.logout = function() {
        Authentication.logout();
        $state.go('login');
      };
    }
]);
