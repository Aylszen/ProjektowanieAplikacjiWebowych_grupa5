var mainApp = angular.module("mainApp", []);

mainApp.controller('tableController', ['$scope', '$http', function($scope, $http) {
   const API_HOME_URL = '/trello_copy_app/api/home';

   $scope.table = {
     owner: "",
     tableid: 0,
     tablename: null,
     contributorsUsernames: [],
     todo: {
       task: [],
       size: 0
     },
      ongoing: {
        task:[],
        size: 0
      },
      blocked: {
        task: [],
        size: 0
      },
      done: {
        task: [],
        size: 0
      }
   };

   $scope.createTable = function() {
       console.log("Weszło tableController");
      $http.post(API_HOME_URL, { table: $scope.table }).then(function(res) {
         console.log(res.data);
         $scope.error = res.data.info;
      });
   };
}]);
