/* global angular */
angular.module('byeniorApp', []).controller('byeniorCtrl', function ($scope, $http) {
  $scope.post = function (sid) {
    $http.post('/register', {data: sid}).success((req, res) => {
      var data = req[0]
      if (data) {
        $scope.data = {sid: data.sid, name: data.name}
        $scope.checkShow = true
      } else $scope.data = '404 Not Found'
    })
  }

  $scope.checkValue = function (sid) {
    if (sid.length === 13) $scope.post(sid)
        else {
      $scope.data = ''
      $scope.checkShow = false
    }
  }

  $scope.insert = function () {
    $http.post('/insert', {data: $scope.data}).success((req, res) => {
      console.log(req)
    })
  }
})
