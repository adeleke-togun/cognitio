angular.module('cognitio.services')
  .factory('Refs', ['$cookies', '$firebase',
    function($cookies, $firebase) {
      var rootRef = new Firebase($cookies.get('rootRef'));     
      
      // define every standard ref used application wide
      return {
        root: rootRef,
        users: rootRef.child('users'),
        assessment: rootRef.child('assessments'),
        submissions: rootRef.child('submissions'),
        feedbacks: rootRef.child('feedbacks'),
        discussion: rootRef.child('forum')
      };
    }
  ]);
