angular.module('cognitio.controllers')
.controller('SubmitCtrl', ['$scope', 'Assessment', function ($scope, Assessment) {

  $scope.assessments = Assessment.all();

  console.log($scope.assessments);

  //grab form data and submit assessments
  $scope.send = function (res) {
    var data = $scope.res;
    console.log(data);
  };

}]);
