angular.module('cognitio.controllers')
.controller('HomeCtrl',
  ['$scope', '$state', '$mdBottomSheet', 'Authentication','Refs','Assessment',
    function($scope, $state, $mdBottomSheet, Authentication, Refs, Assessment) {

      $scope.showMenu = function($event) {
        $mdBottomSheet.show({
          templateUrl: 'views/menu.html',
          controller: 'MenuCtrl',
          targetEvent: $event
        }).then(function(clickedItem) {
          $state.go(clickedItem.state);
        });
      };

      $scope.logout = function() {
        Authentication.logout();
        $state.go('login');
      };
    }
 ]);