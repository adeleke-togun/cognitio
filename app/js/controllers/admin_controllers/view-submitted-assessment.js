angular.module('cognitio.controllers')
.controller('viewSubmittedAssesmentCtrl',
  ['$scope', '$state', 'Authentication', 'Submission', '$stateParams',
    function($scope, $state, Authentication, Submission, $stateParams) {
      
      $scope.int = function(){
        var submissions = Submission.all();
        submissions.$loaded(function(res) {
          $scope.submissions = res;
        });
        
        $scope.assessmentId = $stateParams.assessmentId;

        if($scope.assessmentId) {
          $scope.selectSubmission(Submission.findOne($scope.assessmentId));
        }
      };

      $scope.selectSubmission = function(submission) {
        submission.$loaded(function(res) {
          delete res.$$conf;
          delete res.$id;
          delete res.$priority;
          $scope.submitted = res;
        });
      };
      $scope.int();
    }
 ]);

