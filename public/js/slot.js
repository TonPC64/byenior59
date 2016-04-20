'use strict'
/* global angular,$ */
angular.module('slots', []).directive('slot', function () {
  var der = {
    restrict: 'E',
    template: '<div class="slots" id="slots"><div class="wrapper"></div></div>',
    fn: {
      opts: ['Abraham', 'Bob', 'Carter', 'Doug', 'Fred'],
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
              der.fn.go($('#slots .wrapper'))
            }
          })
        }
      }
    }
  }
  return der
})

var myApp = angular.module('myApp', ['slots'])
myApp.controller('MyCtrl', function ($scope) {
  $scope.myTrigger = false
  $scope.btnClick = function () {
    $scope.myTrigger = !$scope.myTrigger
  }
  console.log('inscope')
})
