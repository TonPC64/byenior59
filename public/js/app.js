/* global angular */
angular.module('byeniorApp', []).controller('byeniorCtrl', function ($scope, $http) {
  $scope.post = function (sid) {
    $http.post('/register', {data: sid}).success(function (req, res) {
      var data = req[0]
      if (data != null) {
        $scope.data = {sid: data.sid, name: data.name, permission: true}
        $scope.checkShow = true
        checkRegister(sid)
      } else {
        $scope.data = {name: '404 Not Found'}
        if ($scope.auto) {
          $scope.sid = ''
        }
      }
    })
  }

  $scope.checkValue = function (sid) {
    if (sid.length === 13) {
      $scope.post(sid)
    } else if (sid.length > 13) {
      $scope.sid = $scope.sid.substr(0, 13)
    } else {
      $scope.data = ''
      $scope.checkShow = false
      $scope.have = ''
      $scope.found = false
    }
  }

  var checkRegister = function (sid) {
    $http.post('/checkRegis', {data: sid}).success(function (req, res) {
      var data = req[0]
      if (data != null) {
        $scope.have = 'ลงทะเบียนแล้ว'
        $scope.found = false
        $scope.sid = ''
      } else {
        $scope.found = true
      }
      if ($scope.auto && $scope.checkShow && $scope.found) {
        $scope.insert()
      }
    })
  }

  $scope.insert = function () {
    $http.post('/insert', {data: $scope.data}).success(function (req, res) {
      $scope.sid = ''
      $scope.checkShow = false
      $scope.have = ''
      $scope.found = false
      $scope.have = 'ลงทะเบียนเสร็จสิ้น'
    })
  }

  $scope.openAuto = function (value) {
    $scope.auto = value
  }
})
