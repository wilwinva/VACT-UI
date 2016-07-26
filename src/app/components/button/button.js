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
        replace: true,
        templateUrl: 'app/components/button/button.tpl.html',
        controller: 'VactButtonCtrl as vbCtrl',
        link : function () {
            console.log('In Directive ****************');
        }
      };
    })
    .controller('VactButtonCtrl',['$scope',
      function($scope) {
        var self = this;
        self.imageSrc = "/images/";
        switch($scope.source.type){
          case 'laptop':
            self.imageSrc += 'laptop.png';
            break;
          case 'desktop':
            self.imageSrc += 'Tower_256.png';
            break;
          case 'document_camera':
            self.imageSrc += 'document_camera.png';
            break;
          case 'video_camera':
            self.imageSrc += 'cam.png';
            break;
          case 'lcd':
            self.imageSrc += 'monitor.png';
            break;
          case 'plasma':
            self.imageSrc += 'plasma.png';
            break;
          case 'projector':
            self.imageSrc += 'projection_design.png';
            break;
        }
        //console.log("self.imageSrc: "+self.imageSrc);
      }
    ])
;
