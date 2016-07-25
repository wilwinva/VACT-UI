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
          vactObject: '='
        },
        //replace: true,
        templateUrl: 'app/components/vactButton/vactButton.tpl.html'//,
        //controller: 'AlertsCtrl as alertsCtrl'
      };
    });