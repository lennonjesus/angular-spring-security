(function () {
  'use strict';

  angular.module('angular-spring-security').config(Config);

  Config.$inject = ['$routeProvider'];

  function Config($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'module/main.html',
      controllerAs: 'vm',
      controller: 'Hello'
    }).otherwise({
      redirectTo: '/'
    });
  }

})();
