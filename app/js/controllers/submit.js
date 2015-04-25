angular.module('cognitio.controllers')
.controller('SubmitCtrl', ['$scope', 'Assessment', 'Submission', '$location', 
	function ($scope, Assessment, Submission, $location) {

  //retrieve all assessments
  $scope.assessments = Assessment.all();

  //grab form data and submit assessments
  $scope.send = function (response) {
    Submission.submit(response.assessment_id, response);
    $location.path('/home');
  };
}]);