var mainApp = angular.module("mainApp", []);

mainApp.controller('loginController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
  const API_LOGIN_URL = '/trello_copy_app/api/login';

  $scope.user = {
    username: '',
    password: ''
  };

  $scope.login = function (pathToNextWebPage) {
    $http.post(API_LOGIN_URL, {
      user: $scope.user
    }).then(function (res) {
      if (res.data.valid == true) {
        console.log(res.data);
        window.location = pathToNextWebPage
      } else {
        $scope.error = res.data.info
      }
    });
  };

}]);