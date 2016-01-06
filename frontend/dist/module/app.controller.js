(function () {
  'use strict';

  angular.module('angular-spring-security').controller('Hello', Hello);

  Hello.$inject = ['$http', '$scope'];

  function Hello($http, $scope) {
    $http.get('angular-spring-security/api/public').then(function (data) {
      $scope.publicText = data.data.texto;
    });

    $http.get('angular-spring-security/api/secret').then(function (data) {
      $scope.secretText = data.data.texto;
    });
  }
})();
