angular.module('cognitio.services')
  .factory('Users', ['$firebase', '$firebaseArray', '$firebaseObject', 'Refs',
    function($firebase, $firebaseArray, $firebaseObject, Refs) {
      return {
        all: function(cb) {
          if(!cb) {
            return $firebaseArray(Refs.users)
          }
          else {
            Refs.users.once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        find: function(uid, cb) {
          if(!cb) {
            return $firebaseObject(Refs.users.child(uid))
          }
          else {
            Refs.users.child(uid).once('value', function(snap) {
              cb(snap.val());
            });
          }
        }
      };
    }
  ]);
