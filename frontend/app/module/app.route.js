(function () {
  'use strict';

  angular.module('angular-spring-security').config(Config);

  Config.$inject = ['$routeProvider'];

  function Config($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'module/main.html'
    }).otherwise({
      redirectTo: '/'
    });
  }

})();
