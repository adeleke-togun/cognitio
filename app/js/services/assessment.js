angular.module('cognitio.services')
  .factory('Assessment', ['Refs', '$firebase', '$firebaseArray', '$firebaseObject', '$rootScope',
    function(Refs, $firebase, $firebaseArray, $firebaseObject, $rootScope) {
      return {
        all: function(cb) {
          if (!cb) {
            return $firebaseArray(Refs.assessment)
          } else {
            Refs.assessment.once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        find: function(assessment_id, cb) {
          if (!cb) {
            return $firebaseObject(Refs.assessment.child(assessment_id))
          } else {
            Refs.assessment.child(assessment_id).once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        create: function(rawAssessment, cb) {
          //grab the details of signed in users from rootScope
          var uid = $rootScope.currentUser.uid;
          var name = $rootScope.currentUser.name;
          var email = $rootScope.currentUser.email;
          var due_on_formatted = new Date(rawAssessment.due_on).getTime();
         
          var newAssessment = {};

          newAssessment.created_at = Firebase.ServerValue.TIMESTAMP;
          newAssessment.creator = name;
          newAssessment.creator_email = email;
          newAssessment.creator_uid = uid;
          newAssessment.due_on = due_on_formatted;
          newAssessment.topic = rawAssessment.topic;
          newAssessment.description = rawAssessment.description;
          newAssessment.updated_at = Firebase.ServerValue.TIMESTAMP;

          Refs.assessment.push(newAssessment, function(error) {
            if (error) {
              cb();
            } else {
              cb('successful');
            }
          });
        },

        update: function(dataToUpdate, cb) {
          var id = dataToUpdate.$id;
          delete dataToUpdate.$id
          Refs.assessment.child(id).update(dataToUpdate, function(error) {
            if (error) {
              cb();
            } else {
              cb('successful');
            }
          });
        }
      };
    }
  ]);
