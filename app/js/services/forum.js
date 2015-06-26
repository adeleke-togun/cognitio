angular.module('cognitio.services')
  .factory('Forum', ['$firebase', '$firebaseArray', '$rootScope', 'Refs',
    function($firebase, $firebaseArray, $rootScope, Refs) {
      return {
        all: function() {
          return $firebaseArray(Refs.discussion)
        },
        ask: function(question) {
          var uid = $rootScope.currentUser.uid,
              name = $rootScope.currentUser.name;
          question.created_at = Firebase.ServerValue.TIMESTAMP;
          question.created_by = name;
          question.creator_uid = uid;
          return $firebase(Refs.discussion).$push(question);
        },
        upVote: function(id, value) {
          var val = value || 0;
          return Refs.discussion.child(id).child('likes').set(val + 1);
        },
        downVote: function(id, value) {
          var val = value || 0;
          return Refs.discussion.child(id).child('dislikes').set(val + 1);
        },
        comment: function(id, comment) {
          var uid = $rootScope.currentUser.uid,
              name = $rootScope.currentUser.name;
          comment.created_at = Firebase.ServerValue.TIMESTAMP;
          comment.creator_uid = uid;
          comment.created_by = name;
          return $firebase(Refs.discussion.child(id).child('comments')).$push(comment);
        } 
      };
    }
  ]);