angular.module('cognitio.services')
  .factory('Assessment', ['Refs', '$firebase',
    function(Refs, $firebase) {
      return {
        all: function(cb) {
          if (!cb) {
            return $firebase(Refs.assessment).$asArray();
          } else {
            Refs.assessment.once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        find: function(assessment_id, cb) {
          if (!cb) {
            return $firebase(Refs.assessment.child(assessment_id)).$asObject();
          } else {
            Refs.assessment.child(assessment_id).once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        create: function(newAssessment, cb) {
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
