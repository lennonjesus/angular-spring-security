(function () {
  'use strict';

  angular.module('angular-spring-security').config(Config);

  Config.$inject = ['$routeProvider', '$httpProvider'];

  function Config($routeProvider, $httpProvider) {
    $routeProvider.when('/', {
      templateUrl: 'module/main.html',
      controllerAs: 'vm',
      controller: 'Hello'
    }).when('/login', {
      templateUrl: 'module/login.html',
      controllerAs: 'vm',
      controller: 'Login'
    }).otherwise({
      redirectTo: '/'
    });

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  }

})();
