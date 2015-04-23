angular.module('cognitio.services').factory('Authorization', ['$q', 'Refs', function($q, Refs) {

  function isAuthorized() {
    var deferred = $q.defer();
    
    var authData = Refs.root.getAuth();
    var adminRef;

    if(authData.google) { 
      
      var googleUid = 'google:'+ authData.google.id;
      adminRef = Refs.root.child('admin').child('google:111952894305964447539'); // use google uid or mail instead
      
    } 

    adminRef.on('value', function(adminSnap) {
      deferred.resolve(adminSnap.val());
    });
    return deferred.promise;
  }

  return {
    isAuthorized: isAuthorized
  };                   
}]);
