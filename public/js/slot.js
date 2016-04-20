'use strict'
/* global angular,$ */
angular.module('slots', []).directive('slot', function () {
  var der = {
    restrict: 'E',
    template: '<div class="slots" id="slots"><div class="wrapper"></div></div>',
    fn: {
      opts: [],
      go: function (elem) {
        der.fn.addSlots(elem)
        der.fn.moveSlots(elem)
      },
      addSlots: function (elem) {
        for (var i = 0; i < 15; i++) {
          var ctr = Math.floor(Math.random() * der.fn.opts.length)
          elem.append("<div class='slot'>" + der.fn.opts[ctr] + '</div>')
        }
      },
      moveSlots: function (elem) {
        var marginTop = parseInt(elem.css('margin-top'), 10)
        marginTop -= (7 * 100)

        var time = 6500
        time += Math.round(Math.random() * 1000)
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
              der.fn.go($('#' + attrs.id + ' #slots .wrapper'))
            }
          })
        }
      }
      console.log(scope[attrs.dataslot])
    }
  }
  return der
})

var myApp = angular.module('myApp', ['slots'])
myApp.controller('MyCtrl', function ($scope, $http) {
  $http.get('/register').success(function (req, res) {
    $scope.dataname = req.map((item) => item.name)
    $scope.datasid = req.map((item) => item.sid.substr(0, 2))
    $scope.datapre = req.map((item) => item.pre)
  })
  $scope.myTrigger = false
  $scope.myTrigger1 = false
  $scope.myTrigger2 = false
  $scope.btnClick = function () {
    $scope.myTrigger = !$scope.myTrigger
    $scope.myTrigger1 = !$scope.myTrigger
    $scope.myTrigger2 = !$scope.myTrigger
  }
})
