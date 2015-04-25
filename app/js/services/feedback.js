angular.module('cognitio.services')
  .factory('Feedback', ['$firebase', '$rootScope', $cookies, 'Refs',
    function($firebase, $rootScope, $cookies, Refs) {
      return {
        all: function() {
          return $firebase(Refs.feedbacks).$asArray();
        },

        createFeedback: function(note, assessment_id, user_id) {
          var feedback = {};
          feedback.feedback_at = Firebase.ServerValue.TIMESTAMP;
          feedback.feedback_by = $rootScope.currentUser.name;
          feedback.note = note;
          return Refs.feedbacks.push(feedback);
          //please set  feedback_id to root/submissions/feedback_id in feedback controller $scope.createFeedback callack
        },

        createComment: function(feedback_id, comment) {
          var comment = {};
          comment.comment_at = Firebase.ServerValue.TIMESTAMP;
          comment.comment_by = $rootScope.currentUser.name;
          return Refs.feedbacks.child(feedback_id).push(comment);
        },

        getFeedback: function(feedback_id) {
          return $firebase(Refs.feedbacks.child(feedback_id)).$asObject();
        }

        deleteFeedback: function(feedback_id) {
          return Refs.feedbacks.child(feedback_id).remove();
        }
        
      };
    }
  ]);
