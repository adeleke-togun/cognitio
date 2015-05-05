angular.module('cognitio.services')
  .factory('Submission', ['$firebase', '$rootScope', 'Refs',
    function($firebase, $rootScope, Refs) {
      return {
        all: function() {
          return $firebase(Refs.submissions).$asArray();
        },
        submit: function(assessment_id, assessment) {
          console.log($rootScope.currentUser)
          var uid = $rootScope.currentUser.uid;
          var name = $rootScope.currentUser.name;
          var email = $rootScope.currentUser.email;

          var assessmentObject = {};
          assessmentObject.submitted_at = Firebase.ServerValue.TIMESTAMP;
          assessmentObject.submitted_by = name;
          assessmentObject.submitted_by_email = email;
          assessmentObject.description = assessment.description;
          assessmentObject.file_url = assessment.file;
          return Refs.submissions.child(assessment_id).child(uid).set(assessmentObject)
        },
        getAllAssessmentSubmission: function(assessment_id) {
          return $firebase(Refs.submissions.child(assessment_id)).$asObject();
        } 
      };
    }
  ]);
