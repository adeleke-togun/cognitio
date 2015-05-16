angular.module('cognitio.controllers')
  .controller('CreateAssessmentCtrl', ['$scope', 'Assessment', '$location', 
  	function ($scope, Assessment, $location) {

  	  $scope.send = function(response) {
  	  	Assessment.create(response);
  	  	toastr.success("Assessment created successfully!");
  	  	$location.path('/admin');
  	  };
    }
]);