angular.module('cognitio.controllers')
.controller('SubmitCtrl', ['$scope', 'Assessment', function ($scope, Assessment) {

  $scope.assessments = Assessment.all();

  console.log($scope.assessments);
}]);
