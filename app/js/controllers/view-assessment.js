angular.module('cognitio.controllers')
.controller('viewAssesmentCtrl',
  ['$scope', '$state', 'Authentication', 'Assessment',
    function($scope, $state, Authentication, Assessment) {
      var assessments = Assessment.all();
      console.log(assessments);
      assessments.$loaded(function(res) {
        $scope.assessments = res;
      });
    }
 ]);
