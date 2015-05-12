angular.module('cognitio.controllers')
.controller('SubmitCtrl', ['$scope', 'Assessment', 'Submission', '$location', 'Upload', 
	function ($scope, Assessment, Submission, $location, Upload) {

  //retrieve all assessments
  $scope.assessments = Assessment.all();

  //grab form data and submit assessments
  $scope.send = function (response) {
    var fil = $scope.files[0]
    var filename = fil.name;
    Upload.upload({
      url: 'https://studentrent-bucket.s3-us-west-2.amazonaws.com/',
      file: fil,
      fileName: filename,
      method: 'POST',
      fields : {
        key: filename,
        AWSAccessKeyId: 'AKIAIDCADT5EBMYVZDEQ', 
        acl: 'public-read',
        policy: 'eyJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKImNvbmRpdGlvbnMiOiBbIAogIHsiYnVja2V0IjogInN0dWRlbnRyZW50LWJ1Y2tldCJ9LCAKICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAiIl0sCiAgeyJhY2wiOiAicHVibGljLXJlYWQifSwKICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiIl0sCiAgWyJzdGFydHMtd2l0aCIsICIkZmlsZW5hbWUiLCAiIl0sCiAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDUyNDI4ODAwMF0KXQp9',
        signature: 'HxvAKpyxy85Li3HZfG7CM7pQbDU=',
        'Content-Type' : fil.type === null || fil.type === '' ? 'application/octet-stream' : fil.type,
        filename: filename
      },

   }).success(function() {
      response.file = filename;
      Submission.submit(response.assessment_id, response)
      toastr.success("Your assignment was submitted successfully!");
      $location.path('/user');
    }).error(function(){
      toastr.info('Failed to uploaded to S3');
   });
  };
}]);