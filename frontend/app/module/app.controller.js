(function () {
  'use strict';

  angular.module('angular-spring-security').controller('Hello', Hello);

  Hello.$inject = ['$http', '$scope', '$rootScope'];

  function Hello($http, $scope, $rootScope) {
    $http.get('angular-spring-security/api/public').then(function (data) {
      $scope.publicText = data.data.texto;
    });

    $http.get('angular-spring-security/api/secret').then(function (data) {
      $scope.secretText = data.data.texto;
    });

    $scope.logout = function() {
      $http.post('angular-spring-security/api/logout', {}).success(function() {
        console.log("Logout OK");
        $location.path("/");
      }).error(function(error) {
        console.log(error);
      });
      $rootScope.authenticated = false;
    }

  }
})();
