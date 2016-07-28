'use strict';

/**
 * @ngdoc overview
 * @project VACT
 * @name WebSocketService
 * @description
 * # WebSocketService
 *
 * Web Socket Service
 */
angular.module('vactApp')
    .controller('AdminCtrl', ['vactModel', 'equipmentList', function (vactModel, equipmentList) {
      var self = this;
      console.log('made it in adminCtrl');
      self.equipmentLists = equipmentList;

      self.computers = self.equipmentLists.computers;
      self.displays = self.equipmentLists.displays;
      self.cameras = self.equipmentLists.cameras;
      self.peripherals = self.equipmentLists.peripherals;
      self.preloadedConfigurations = self.equipmentLists.preloadedConfigurations;

      self.newSources = [];//to hold the equipment objects added
      self.newTargets = [];//to hold the equipment objects added

      self.computerSelected = '';
      self.displaySelected = '';
      self.cameraSelected = '';
      self.peripheralSelected = '';

      self.showComputers = false;
      self.showDisplays = false;
      self.showCameras = false;
      self.showPeripherals = false;
      self.showEquipmentSpecifics = false;

      self.equipmentSpecifics = [];

      self.equipmentType = '';
      self.equipmentLabel = '';
      self.equipmentId = '';
      self.equipmentSecured = '';

      self.equipmentSelected = function(equipment){
        console.log('made it in equipmentSelected:'+equipment);
        //need to find the equipment object in the existing arrays

        self.equipmentType = '';
        self.equipmentLabel = '';
        self.equipmentId = '';
        self.equipmentSecured = '';
        self.showEquipmentSpecifics = true;
      };

      self.findEquipmentObjByReference = function(){
      };

      self.setEquipmentList = function(activeList){
        console.log('made it in setEquipmentList');
        console.log(activeList);
        self.showComputers = false;
        self.showDisplays = false;
        self.showCameras = false;
        self.showPeriphals = false;
        self.showEquipmentSpecifics = false;
        activeList = true;
      };
    }
    ])
;
