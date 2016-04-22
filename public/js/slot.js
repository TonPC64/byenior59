'use strict'
/* global angular,$ */
angular.module('slots', []).directive('slot', function () {
  var der = {
    time: '',
    result: '',
    restrict: 'E',
    template: '<div class="slots" id="slots"><div class="wrapper"></div></div>',
    fn: {
      opts: [],
      go: function (elem) {
        der.fn.clearSlots(elem)
        der.fn.addSlots(elem)
        der.fn.moveSlots(elem)
      },
      clearSlots: function (elem) {
        elem.children().remove()
        elem.css('margin-top', 7)
      },
      addSlots: function (elem) {
        der.fn.opts.forEach((item) => {
          elem.append("<div class='slot'>" + item + '</div>')
        })
      },
      moveSlots: function (elem) {
        var marginTop = parseInt(elem.css('margin-top'), 0)
        marginTop -= ((parseInt(der.time, 0)) * 100)
        var time = der.time * 1000
        der.result = der.fn.opts[der.time]
        console.log(der.fn.opts[der.time])
        elem.stop(true, true)

        elem.animate(
          {'margin-top': marginTop + 'px'},
          {'duration': time, 'easing': 'easeOutElastic'})
      }
    },
    link: function (scope, ele, attrs) {
      if (attrs.trigger && attrs.trigger !== undefined) {
        if (scope[attrs.trigger] !== undefined) {
          scope.$watch(attrs.trigger, function (newValue, oldValue) {
            if (newValue) {
              der.fn.opts = scope[attrs.dataslot]
              der.time = attrs.time
              der.fn.go($('#' + attrs.id + ' #slots .wrapper'))
              if (attrs.func != null) scope[attrs.func](der.result)
            }
          })
        }
      }
    }
  }
  return der
})

var myApp = angular.module('myApp', ['slots'])
myApp.controller('MyCtrl', function ($scope, $http, $timeout) {
  var reciveData = function () {
    $http.get('/register').success(function (req, res) {
      $scope.rand = Math.round(Math.random() * (req.map((item) => item.name).length) * 3)
      $scope.dataname = setData(req.map((item) => item.name), 30)
      $scope.datasid = setData(req.map((item) => 'ปี ' + item.sid.substr(0, 2)), 10)
      $scope.datapre = setData(req.map((item) => item.pre), 15)
    // updateData($scope.dataname[34])
    })
  }

  reciveData()
  $scope.myTrigger = false
  $scope.btnClick = function () {
    reciveData()
    $scope.myTrigger = !$scope.myTrigger
    $timeout(function () { $scope.myTrigger = false }, 30000)
  }

  $scope.updateData = function (name) {
    $http.put('/register', {name: name}).success(function (req, res) {})
  }

  var setData = function (arr, len) {
    var data = arr
    data.forEach((item) => {
      arr.push(item)
    })
    data.forEach((item) => {
      arr.push(item)
    })
    var temp = arr.splice(arr.length - len, len)
    temp = temp.reverse()
    temp.forEach((item) => {
      arr.splice(0, 0, item)
    })
    return shuffleData(arr)
  }

  var shuffleData = function (arr) {
    var temp = arr.splice(arr.length - $scope.rand, $scope.rand)
    temp = temp.reverse()
    temp.forEach((item) => {
      arr.splice(0, 0, item)
    })
    return arr
  }
})
