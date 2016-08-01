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

      self.sources = [{'id':'vidcam_1','type':'video_camera','label':'Cam 1','target':'lcd1'}];//to hold the equipment objects added
      self.targets = [{'id':'lcd_1','type':'lcd','label':'LCD 1','source':'vidcam_1'},{'id':'lcd_2','type':'lcd','label':'LCD 2','source':'none'}];//to hold the equipment objects added

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

      self.addAnother = false;
      self.equipmentCount = 0;
      self.equipmentGroup = '';
      self.tempObj = {};

      self.equipmentSelected = function(equipment, equipmentGroup){
        console.log('made it in equipmentSelected:'+equipment);
        //need to find the equipment object in the existing arrays
        self.equipmentCount = 0;
        self.equipmentGroup = equipmentGroup;
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
            arrayToSearch = self.peripherals;
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
          arrayToSearch = self.targets;
        }else{
          arrayToSearch = self.sources;
        }
        self.destinationArray = arrayToSearch;

        var increment = 1;
        if(arrayToSearch.length > 0){
          for(var a=0;a<arrayToSearch.length;a++){
            if(arrayToSearch[a].type === equipmentType){
              increment++;
            }
          }
        }
        self.tempObj = newObj;
        self.equipmentCount = increment;
        self.equipmentType = newObj.type;
        self.equipmentLabel = newObj.label + ' ' + increment;
        self.equipmentId = newObj.id + '_' + increment;
      };

      self.saveEquipment = function(){
        var newEquipment = {};
        newEquipment.type = self.equipmentType;
        newEquipment.label = self.equipmentLabel;
        newEquipment.id = self.equipmentId;
        newEquipment.secured = self.equipmentSecured;
        self.destinationArray.push(newEquipment);
        self.addAnother = true;
      };
      self.addAnotherEquipment = function(){
        self.equipmentCount++;
        var newEquipment = {};
        newEquipment.type = self.tempObj.type;
        newEquipment.label = self.tempObj.label + ' ' + self.equipmentCount;
        newEquipment.id = self.tempObj.id + '_' + self.equipmentCount;
        newEquipment.secured = self.equipmentSecured;
        self.destinationArray.push(newEquipment);
        self.addAnother = true;
      };
      self.resetEquipment = function(){
        self.computerSelected = '';
        self.displaySelected = '';
        self.cameraSelected = '';
        self.peripheralSelected = '';
        self.setEquipmentList();
        self.addAnother = false;
      };

      self.setEquipmentList = function(){
        self.showComputers = false;
        self.showDisplays = false;
        self.showCameras = false;
        self.showPeriphals = false;
        self.showEquipmentSpecifics = false;
      };
    }
    ])
;
