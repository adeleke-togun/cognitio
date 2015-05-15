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
        AWSAccessKeyId: 'AKIAISEQHWBOLTLYDFYQ', 
        acl: 'private',
        policy: 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogInN0dWRlbnRyZW50LWJ1Y2tldCJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgIiJdLAogICAgeyJhY2wiOiAicHJpdmF0ZSJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLAogICAgWyJzdGFydHMtd2l0aCIsICIkZmlsZW5hbWUiLCAiIl0sCiAgICBbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwgMCwgNTI0Mjg4MDAwXQogIF0KfQ==',
        signature: 'g/OPVsj8f1k5XsFEZ8BkSZDDRIc=',
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