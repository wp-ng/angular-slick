(function (angular) {
  'use strict';

  angular.module('slick').controller('mainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

    $timeout(function() {
      $scope.awesomeThings = [
        'HTML5',
        'AngularJS',
        'Yarn',
        'Slick',
        'Bower',
        'JS',
      ];
    }, 1000);

    $scope.breakpoints = {
      768: {
        'slidesToShow': 2,
        'slidesToScroll': 2
      },
      480: {
        'slidesToShow': 1,
        'slidesToScroll': 1
      }
    };
  }]);
})(angular);
