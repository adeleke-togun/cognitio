angular.module('cognitio.controllers')
.controller('MenuCtrl', ['$scope',
  function($scope) {
    $scope.items = [
      { name: 'Users', state:'users', icon: 'fa-users' },
      { name: 'Logout', state:'logout', icon: 'fa-sign-out' }
    ];

    $scope.listItemClick = function($index) {
      // var clickedItem = $scope.items[$index];
      // .hide(clickedItem);
    };
  }
]);
