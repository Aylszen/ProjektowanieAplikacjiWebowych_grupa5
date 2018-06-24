var mainApp = angular.module("mainApp", []);

mainApp.controller('registerController', ['$scope', '$http', function ($scope, $http) {
    const API_REGISTER_URL = '/trello_copy_app/api/register';

    $scope.user = {
        fname: '',
        lname: '',
        email: '',
        username: '',
        password: '',
    };

    $scope.register = function () {
        $http.post(API_REGISTER_URL, {
            user: $scope.user
        }).then(function (res) {
            console.log(res.data);
            $scope.error = res.data.info;
        });
    };
}]);