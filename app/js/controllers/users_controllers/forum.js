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