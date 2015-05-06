angular.module('cognitio.controllers')
.controller('viewAssesmentCtrl',
  ['$scope', '$state', 'Authentication', 'Assessment',
    function($scope, $state, Authentication, Assessment) {
      $scope.assessments = Assessment.all();
      console.log("assessments", $scope.assessments);
      
      for(var i = 0; i < $scope.assessments.length; i++) {
        console.log("jjjj", $scope.assessments[i]);
        $scope.createdDate = new Date($scope.assessments[i].created_at * 1000);
        console.log("converted date", $scope.createdDate);
      }
      // angular.forEach(function() {});
    }
 ]);
