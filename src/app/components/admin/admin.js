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
      self.destinationArray = [];

      self.equipmentType = '';
      self.equipmentLabel = '';
      self.equipmentId = '';
      self.equipmentSecured = false;

      self.equipmentSelected = function(equipment, equipmentGroup){
        console.log('made it in equipmentSelected:'+equipment);
        //need to find the equipment object in the existing arrays
        self.findEquipmentObjByReference(equipment, equipmentGroup);

        self.showEquipmentSpecifics = true;
      };

      self.findEquipmentObjByReference = function(equipmentType, equipmentGroup){
        var arrayToSearch = [];
        switch(equipmentGroup){
          case 'computers':
            arrayToSearch = self.computers;
            break;
          case 'displays':
            arrayToSearch = self.displays;
            break;
          case 'cameras':
            arrayToSearch = self.cameras;
            break;
          case 'peripheral':
            arrayToSearch = self.peripheral;
            break;
        }
        var newObj = {};
        for(var i=0;i<arrayToSearch.length;i++){
          if(arrayToSearch[i].type === equipmentType){
            newObj = arrayToSearch[i];
          }
        }
        //check to see if this type of equipment is already ing the source or target lists
        if(equipmentGroup === 'displays'){
          arrayToSearch = self.newTargets;
        }else{
          arrayToSearch = self.newSources;
        }
        self.destinationArray = arrayToSearch;

        var increment = 1;
        if(arrayToSearch.length > 0){
          for(var i=0;i<arrayToSearch.length;i++){
            if(arrayToSearch[i].type === equipmentType){
              increment++;
            }
          }
        }
        self.equipmentType = newObj.type;
        self.equipmentLabel = newObj.label + ' ' + increment;
        self.equipmentId = newObj.id + increment;
      };

      self.saveEquipment = function(){
        var newEquipment = {};
        newEquipment.type = self.equipmentType;
        newEquipment.label = self.equipmentLabel;
        newEquipment.id = self.equipmentId;
        newEquipment.secured = self.equipmentSecured;
        self.destinationArray.push(newEquipment);

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
