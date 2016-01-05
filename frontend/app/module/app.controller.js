(function () {
  'use strict';

  angular.module('angular-spring-security').controller(HelloController);

  HelloController.$inject = ['$http'];

  function HelloController($http) {
    $http.get('angular-spring-security/api/public')
  }
})();
