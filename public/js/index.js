(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* define our modules */
angular.module('cognitio.services', ['firebase','ngCookies']);
angular.module('cognitio.filters', []);
angular.module('cognitio.directives', ['monospaced.elastic']);
angular.module('cognitio.controllers', []);

/* load services */
require('./js/services/authentication.js');
require('./js/services/refs.js');
require('./js/services/toast.js');
require('./js/services/users.js');
require('./js/services/authorization.js');
require('./js/services/assessment.js');
require('./js/services/submission.js');
require('./js/services/feedback.js');
require('./js/services/forum.js');

/* load filters */
require('./js/filters/reverse.js');

/* load directives */
require('./js/directives/authorization.js');


/* load controllers */
require('./js/controllers/login.js');
require('./js/controllers/menu.js');
require('./js/controllers/users_controllers/users_home.js');
require('./js/controllers/users_controllers/submit.js');
require('./js/controllers/users_controllers/users.js');
require('./js/controllers/users_controllers/forum.js');
require('./js/controllers/admin_controllers/admin_home.js');
require('./js/controllers/admin_controllers/view-assessments.js');
require('./js/controllers/admin_controllers/view-submitted-assessment.js');
require('./js/controllers/admin_controllers/create-assessment.js');


window.Cognitio = angular.module("Cognitio", [
  'ui.router',
  'ngFileUpload',
  'cognitio.controllers',
  'cognitio.directives',
  'cognitio.filters',
  'cognitio.services'
]);

Cognitio.run(['$rootScope', '$state', 'Authentication', 'Refs', 'Toast','Authorization',
  function($rootScope, $state, Authentication, Refs, Toast, Authorization) {
  $rootScope._ = window._;
  $rootScope.moment = window.moment;
  $rootScope.authCallback = function(authData) {
    Authentication.auth(authData, function(user) {
      if(user) {
        // check if admin, else continue as user
        Authorization.isAuthorized().then(function(admin) {
          if(admin) {
            $state.go('admin');
            toastr.success("Hi, " + user.name + "<br />You're logged in as an Admin!");
          }
          else {
            //you can redirect a user here to the admin page by checking the service
            toastr.success('Welcome, ' + user.name + '!');
          }
        });
      }
      else {
        // logged out
        Authentication.logout();
        $state.go('login');
      }
    });
  };

  Refs.root.onAuth($rootScope.authCallback);
}]);

//Toastr setup options
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "800",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

/* application routes */
Cognitio.config(['$stateProvider','$locationProvider',
 function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .state('logout', {
      url: '/logout',
      controller: ['Authentication', '$state', '$rootScope', function (Authentication, $state, $rootScope) {
        Authentication.logout();
        $state.go('login');
        $rootScope.showPage();
      }]
    })
    .state('user', {
      url: '/user',
      templateUrl: 'views/users/home.html',
      controller: 'UsersHomeCtrl'
    })
    .state('submit', {
      url: '/user/submit',
      templateUrl: 'views/users/submit.html',
      controller: 'SubmitCtrl'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'views/admin/home.html',
      controller: 'AdminHomeCtrl'
    })
    .state('forum', {
      url: '/user/forum',
      templateUrl: 'views/users/need-help.html',
      controller: 'ForumCtrl'
    })
    .state('view-assessments', {
      url: '/admin/view-assessments',
      templateUrl: 'views/admin/view-assessments.html',
      controller: 'viewAssesmentCtrl'
    })
    .state('submitted', {
      url: '/admin/view-assessment/:assessmentId',
      templateUrl: 'views/admin/view-submitted-assesment.html',
      controller: 'viewSubmittedAssesmentCtrl'
    })
    .state('create-assessment', {
      url: '/admin/create-assessment',
      templateUrl: 'views/admin/create-assessment.html',
      controller: 'CreateAssessmentCtrl'
    });
}]);

},{"./js/controllers/admin_controllers/admin_home.js":2,"./js/controllers/admin_controllers/create-assessment.js":3,"./js/controllers/admin_controllers/view-assessments.js":4,"./js/controllers/admin_controllers/view-submitted-assessment.js":5,"./js/controllers/login.js":6,"./js/controllers/menu.js":7,"./js/controllers/users_controllers/forum.js":8,"./js/controllers/users_controllers/submit.js":9,"./js/controllers/users_controllers/users.js":10,"./js/controllers/users_controllers/users_home.js":11,"./js/directives/authorization.js":12,"./js/filters/reverse.js":13,"./js/services/assessment.js":14,"./js/services/authentication.js":15,"./js/services/authorization.js":16,"./js/services/feedback.js":17,"./js/services/forum.js":18,"./js/services/refs.js":19,"./js/services/submission.js":20,"./js/services/toast.js":21,"./js/services/users.js":22}],2:[function(require,module,exports){
angular.module('cognitio.controllers')
  .controller('AdminHomeCtrl', ['$scope', '$state', 'Authentication',
    function($scope, $state, Authentication) {
    
      $scope.logout = function() {
        Authentication.logout();
        $state.go('login');
      };
    }
]);

},{}],3:[function(require,module,exports){
angular.module('cognitio.controllers')
  .controller('CreateAssessmentCtrl', ['$scope', 'Assessment', '$location', 
  	function ($scope, Assessment, $location) {

  	  $scope.send = function(response) {
  	  	Assessment.create(response);
  	  	toastr.success("Assessment created successfully!");
  	  	$location.path('/admin');
  	  };
    }
]);
},{}],4:[function(require,module,exports){
angular.module('cognitio.controllers')
  .controller('viewAssesmentCtrl', ['$scope', '$state', 'Authentication', 'Assessment',
    function($scope, $state, Authentication, Assessment) {
      
      var assessments = Assessment.all();
      
      assessments.$loaded(function(res) {
        $scope.assessments = res;
      });
    }
]);

},{}],5:[function(require,module,exports){
angular.module('cognitio.controllers')
.controller('viewSubmittedAssesmentCtrl',
  ['$scope', '$state', 'Authentication', 'Submission', '$stateParams',
    function($scope, $state, Authentication, Submission, $stateParams) {
      
      $scope.int = function(){
        var submissions = Submission.all();
        submissions.$loaded(function(res) {
          $scope.submissions = res;
        });
        
        $scope.assessmentId = $stateParams.assessmentId;

        if($scope.assessmentId) {
          $scope.selectSubmission(Submission.findOne($scope.assessmentId));
        }
      };

      $scope.selectSubmission = function(submission) {
        submission.$loaded(function(res) {
          delete res.$$conf;
          delete res.$id;
          delete res.$priority;
          $scope.submitted = res;
        });
      };
      $scope.int();
    }
 ]);


},{}],6:[function(require,module,exports){
angular.module('cognitio.controllers')
	.controller('LoginCtrl', ['$scope', 'Authentication',
	  function($scope, Authentication) {
	    $scope.login = function() {
	      Authentication.login();
	    };
	  }
]);

},{}],7:[function(require,module,exports){
angular.module('cognitio.controllers')
.controller('MenuCtrl', ['$scope',
  function($scope) {
    $scope.items = [
      { name: 'Users', state:'users', icon: 'fa-users' },
      { name: 'Logout', state:'logout', icon: 'fa-sign-out' }
    ];

    $scope.listItemClick = function($index) {
      // var clickedItem = $scope.items[$index];
      // .hide(clickedItem);
    };
  }
]);

},{}],8:[function(require,module,exports){
angular.module('cognitio.controllers')
.controller('ForumCtrl', ['$scope', 'Forum', 'Users', function ($scope, Forum, Users) {
  //retrieve all discussion
  $scope.id = null;

  Forum.all().$loaded(function(response) {
    $scope.discussions = response;
  });

  $scope.askQuestion = function(question) {
    if(question != undefined) {
      Forum.ask(question).then(function(res) {
        toastr.success("question added successfully");
        $('#questionModal').modal('hide')
      });
    }
    else {
      toastr.error("Fill the form first");
    }
    
  };

  $scope.findUser = function (id) {
    return Users.find(id);
  }

  $scope.like = function(id, value) {
    Forum.upVote(id, value);
  }

  $scope.dislike = function (id, value) {
    Forum.downVote(id, value);
  }

  $scope.saveComment = function(comment) {
    if(comment != undefined) {
      Forum.comment($scope.id, comment).then(function(res) {
        toastr.success("comment added successfully")
        $('#commentModal').modal('hide')
      })
    }
    else {
      toastr.error("Fill the form first");
    }
  };

  $('#commentModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); 
    $scope.id = button.data('value');
  })
  
}]);
},{}],9:[function(require,module,exports){
angular.module('cognitio.controllers')
.controller('SubmitCtrl', ['$scope', 'Assessment', 'Submission', '$location', 'Upload', 
	function ($scope, Assessment, Submission, $location, Upload) {

  //retrieve all assessments
  $scope.assessments = Assessment.all();

  //grab form data and submit assessments
  $scope.send = function (response) {
    var fil = $scope.files[0]
    var filename = moment() + fil.name;
    Upload.upload({
      url: 'https://studentrent-bucket.s3-us-west-2.amazonaws.com/',
      file: fil,
      fileName: filename,
      method: 'POST',
      fields : {
        key: filename,
        AWSAccessKeyId: 'AKIAIDCADT5EBMYVZDEQ', 
        acl: 'public-read',
        policy: 'eyJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKImNvbmRpdGlvbnMiOiBbIAogIHsiYnVja2V0IjogInN0dWRlbnRyZW50LWJ1Y2tldCJ9LCAKICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAiIl0sCiAgeyJhY2wiOiAicHVibGljLXJlYWQifSwKICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiIl0sCiAgWyJzdGFydHMtd2l0aCIsICIkZmlsZW5hbWUiLCAiIl0sCiAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDUyNDI4ODAwMF0KXQp9',
        signature: 'HxvAKpyxy85Li3HZfG7CM7pQbDU=',
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
},{}],10:[function(require,module,exports){
angular.module('cognitio.controllers')
  .controller('UsersCtrl',['$scope', '$stateParams', 'Toast', 'Users',
    function($scope, $stateParams, Toast, Users) {

      $scope.users = Users.all();

      if($stateParams.userId) {
        $scope.users.$loaded().then(function() {
          $scope.selectUser(Users.find($stateParams.userId));
        });
      }

      $scope.selectUser = function(user) {
        $scope.selectedUser = user;
      };

      $scope.updateUser = function() {
        $scope.selectedUser.$save().then(function() {
          Toast($scope.selectedUser.name + ' updated successfully');
        });
      };
    }
  ]);
},{}],11:[function(require,module,exports){
angular.module('cognitio.controllers')
.controller('UsersHomeCtrl',
  ['$scope', '$state', 'Authentication',
    function($scope, $state, Authentication) {
    
      $scope.logout = function() {
        Authentication.logout();
        $state.go('login');
      };
    }
 ]);

},{}],12:[function(require,module,exports){
// this is a directive to check if a logged in user is admin else it redirects to login include in the admin pages
angular.module('cognitio.directives')
  .directive('isAuthorized', function() {
    return {
      restrict: 'EA',
      controller: ['$scope', 'Authorization', '$location', '$rootScope',
        function($scope, Authorization, $location, $rootScope) {
        Authorization.isAuthorized().then(function(admin) {
          $rootScope.showPage = true;
          if(!admin) {
            toastr.info("You're not authorized to view this page!");
            window.location.pathname = '/user';
          }
          else{
            $scope.showPage = true;
          }
        }, function (err) {
          $rootScope.showPage = false;
          $location.path('/');
        });
      }]
    };
  });

},{}],13:[function(require,module,exports){
angular.module("cognitio.filters")
 .filter('reverse', function() {
  function toArray(list) {
    var k, out = [];
    if( list ) {
      if( angular.isArray(list) ) {
        out = list;
      }
      else if( typeof(list) === 'object' ) {
        for (k in list) {
          if (angular.isObject(list[k])) { out.push(list[k]); }
        }
      }
    }
    return out;
  }
  return function(items) {
    return toArray(items).slice().reverse();
  };
});

},{}],14:[function(require,module,exports){
angular.module('cognitio.services')
  .factory('Assessment', ['Refs', '$firebase', '$rootScope',
    function(Refs, $firebase, $rootScope) {
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

        create: function(rawAssessment, cb) {
          //grab the details of signed in users from rootScope
          var uid = $rootScope.currentUser.uid;
          var name = $rootScope.currentUser.name;
          var email = $rootScope.currentUser.email;

          var newAssessment = {};

          newAssessment.created_at = Firebase.ServerValue.TIMESTAMP;
          newAssessment.creator = name;
          newAssessment.creator_email = email;
          newAssessment.creator_uid = uid;
          newAssessment.due_on = rawAssessment.due_on;
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

},{}],15:[function(require,module,exports){
angular.module('cognitio.services')
  .factory('Authentication', ['$cookies', '$firebase', '$rootScope','$state', 'Refs',
    function($cookies, $firebase, $rootScope, $state, Refs) {
      return {
        login: function(cb) {
          var options = { remember: true, scope: "email" };
          Refs.root.authWithOAuthPopup("google", function(error, authData) {
            if(cb) cb(error, authData);
          }, options);
        },

        logout: function() {
          Refs.root.unauth();
          $rootScope.currentUser = null;
        },

        auth: function(authData, cb) {
          if(!authData) {
            // we're logged out. nothing else to do
            return cb(null);
          }

          var self = this;

          // are we dealing with a new user? find out by checking for a user record
          var userRef = Refs.users.child(authData.uid);
          userRef.once('value', function(snap) {
            var user = snap.val();

            if(user) {
              // google user logging in, update their access token
              if(authData.provider === "google") {
                userRef.update({access_token: authData.token});
              }
              // save the current user in the global scope
              $rootScope.currentUser = user;
              // navigate to home page
              $state.go('user');
            }
            else {
              // construct the user record the way we want it
              user = self.buildUserObjectFromGoogle(authData);
              // save it to firebase collection of users
              userRef.set(user);
              // save the current user in the global scope
              $rootScope.currentUser = user;
              // navigate to home page
              $state.go('login');
            }

            // ...and we're done
            return cb(user);
          });
        },

        buildUserObjectFromGoogle: function(authData) {
          return {
            uid: authData.uid,
            name: authData.google.displayName,
            email: authData.google.email,
            access_token: authData.google.accessToken,
            first_name: authData.google.cachedUserProfile.given_name,
            known_as: authData.google.cachedUserProfile.given_name,
            last_name: authData.google.cachedUserProfile.family_name,
            picture: authData.google.cachedUserProfile.picture,
            created_at: Firebase.ServerValue.TIMESTAMP
          };
        }
      };
    }
  ]);

},{}],16:[function(require,module,exports){
angular.module('cognitio.services')
  .factory('Authorization', ['$q', 'Refs', function($q, Refs) {

    function isAuthorized() {
      var deferred = $q.defer();

      var authData = Refs.root.getAuth();
      var adminRef;
      if (!authData) {
        deferred.reject('Not logged in');
        return deferred.promise;
      }
      if(authData && authData.google) {
        var googleUid = 'google:'+ authData.google.id;
        adminRef = Refs.root.child('admin').child(googleUid); // use google uid or mail instead
      }

      adminRef.on('value', function(adminSnap) {
        console.log(adminSnap.val());
        deferred.resolve(adminSnap.val());
      });
      return deferred.promise;
    }

    return {
      isAuthorized: isAuthorized
    };
}]);

},{}],17:[function(require,module,exports){
angular.module('cognitio.services')
  .factory('Feedback', ['$firebase', '$rootScope', 'Refs',
    function($firebase, $rootScope, Refs) {
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
        },

        deleteFeedback: function(feedback_id) {
          return Refs.feedbacks.child(feedback_id).remove();
        }
        
      };
    }
  ]);

},{}],18:[function(require,module,exports){
angular.module('cognitio.services')
  .factory('Forum', ['$firebase', '$rootScope', 'Refs',
    function($firebase, $rootScope, Refs) {
      return {
        all: function() {
          return $firebase(Refs.discussion).$asArray();
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
},{}],19:[function(require,module,exports){
angular.module('cognitio.services')
  .factory('Refs', ['$cookies', '$firebase',
    function($cookies, $firebase) {
      var rootRef = new Firebase($cookies.rootRef || 'YOUR_FIREBASE_URL');     
      
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

},{}],20:[function(require,module,exports){
angular.module('cognitio.services')
  .factory('Submission', ['$firebase', '$rootScope', 'Refs',
    function($firebase, $rootScope, Refs) {
      return {
        all: function() {
          // console.log('Firebase--->',$firebase(Refs.submissions));
          return $firebase(Refs.submissions).$asArray();
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
          return $firebase(Refs.submissions.child(id)).$asObject();
        } 
      };
    }
  ]);

},{}],21:[function(require,module,exports){
angular.module('cognitio.services')
  .factory('Toast', [function($mdToast){
    return function(text, hideDelay, position, cb) {
      text = text || 'Toast Text Goes Here';
      hideDelay = hideDelay || 2000;
      position = position || 'bottom left';

      // $mdToast.show({
      //   template: '<md-toast>'+text+'</md-toast>',
      //   hideDelay: hideDelay,
      //   position: position
      // });
    };
  }]);

},{}],22:[function(require,module,exports){
angular.module('cognitio.services')
  .factory('Users', ['$firebase', 'Refs',
    function($firebase, Refs) {
      return {
        all: function(cb) {
          if(!cb) {
            return $firebase(Refs.users).$asArray();
          }
          else {
            Refs.users.once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        find: function(uid, cb) {
          if(!cb) {
            return $firebase(Refs.users.child(uid)).$asObject();
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

},{}]},{},[1]);
