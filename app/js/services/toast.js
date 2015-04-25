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
