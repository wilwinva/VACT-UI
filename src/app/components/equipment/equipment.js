'use strict';

/**
 * @ngdoc function
 * @name insideApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Alerts Controller of the insideApp
 */
angular.module('vactApp')
    .directive('vactEquipment', function () {
      return {
        restrict: 'E',
        scope:{
          source: '='
        },
        replace: true,
        templateUrl: 'app/components/equipment/equipment.tpl.html',
        controller: 'EquipmentCtrl as equipmentCtrl',
        link : function () {
            console.log('In Directive ****************');
        }
      };
    })
    .controller('EquipmentCtrl',['$scope',
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
          case 'monitor':
            self.imageSrc += 'monitor.png';
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
