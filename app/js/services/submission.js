angular.module('cognitio.services')
  .factory('Submission', ['$firebase', '$rootScope', 'Refs',
    function($firebase, $rootScope, Refs) {
      return {
        all: function() {
          return $firebase(Refs.submissions).$asArray();
        },
        submit: function(assessment_id, file) {
          var uid = $rootScope.currentUser.uid;
          var assessment = {};
          assessment.submitted_at = Firebase.ServerValue.TIMESTAMP;
          assessment.file_name = file;
          return Refs.submissions.child(assessment_id).child(uid).set(assessment);
        },
        getAllAssessmentSubmission: function(assessment_id) {
          return $firebase(Refs.submissions.child(assessment_id)).$asObject();
        } 
      };
    }
  ]);
