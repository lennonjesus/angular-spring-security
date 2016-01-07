(function () {
  'use strict';

  angular.module('angular-spring-security').controller('Login', Login);

  Login.$inject = ['$scope', '$rootScope', '$http', '$location'];

  function Login($scope, $rootScope, $http, $location) {

    var authenticate = function (credentials, callback) {

      var headers = credentials ? {
          authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)
        } : {};


      $http.get('/angular-spring-security/api/user', {headers : headers}).success(function (data) {
        $rootScope.authenticated = data.name ? true : false;

        $rootScope.username = data.name;

        callback && callback();
      }).error(function () {
        $rootScope.authenticated = false;

        callback && callback();
      });
    }

    authenticate();

    $scope.credentials = {};

    $scope.login = function () {
      authenticate($scope.credentials, function () {
        if ($rootScope.authenticated) {
          console.log('Login OK');
          $location.path("/");
        } else {
          console.log('Falha no login');
          $location.path("/login");
        }

        $scope.error = !$rootScope.authenticated;

      })
    };

  }
})();
