angular.module('cognitio.services')
  .factory('Submission', ['$firebase', '$rootScope','$firebaseArray', '$firebaseObject', 'Refs',
    function($firebase, $rootScope, $firebaseArray, $firebaseObject, Refs) {
      return {
        all: function() {
          return $firebaseArray(Refs.submissions)
        },
        submit: function(assessment_id, assessment) {
          var uid = $rootScope.currentUser.uid;
          var name = $rootScope.currentUser.name;
          var email = $rootScope.currentUser.email;

          var assessmentObject = {};

          assessmentObject.submitted_at = Firebase.ServerValue.TIMESTAMP;
          assessmentObject.submitted_by = name;
          assessmentObject.submitted_by_email = email;
          assessmentObject.description = assessment.description;
          assessmentObject.file_url = assessment.file;

          return Refs.submissions.child(assessment_id).child(uid).set(assessmentObject);
        },
        findOne: function(id) {
          return $firebaseObject(Refs.submissions.child(id))
        } 
      };
    }
  ]);
