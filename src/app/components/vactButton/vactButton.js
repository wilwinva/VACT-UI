'use strict';

/**
 * @ngdoc function
 * @name insideApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Alerts Controller of the insideApp
 */
angular.module('vactApp')
    .directive('vactButton', function () {
      return {
        restrict: 'E',
        scope:{
          source: '='
        },
        //replace: true,
         // transclude: true,
        templateUrl: 'app/components/vactButton/vactButton.tpl.html', //<ng-transclude></ng-transclude>',//
        //controller: 'AlertsCtrl as alertsCtrl'
          link : function () {
              console.log('In Directive ****************');
          }
      };
    });
