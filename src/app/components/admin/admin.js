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
      self.roomConfigurations = self.equipmentLists.rooms;

      self.configurationTypes = [{'label':'Custom','id':'custom'},{'label':'Basic','id':'basic'},{'label':'Chameleon-Mini','id':'chameleon-mini'},{'label':'Chameleon','id':'chameleon'}]
      self.configurationType = 'custom';
      self.roomConfiguration ='';
      self.unclassified = false;
      self.classified = false;
      self.spn = false;

      self.sources = [];
      self.targets = [];

/*
      self.sources = [{'id':'vidcam_1','type':'video_camera','label':'Cam 1','target':'lcd_1'}];//to hold the equipment objects added
      self.targets = [{'id':'lcd_1','type':'lcd','label':'LCD 1','source':'vidcam_1'},{'id':'lcd_2','type':'lcd','label':'LCD 2','source':'none'}];//to hold the equipment objects added
*/

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

      self.loadConfiguration = function(configurationType){
        var preloadConfiguration = [];
        switch(configurationType){
          case 'custom':
            self.sources = [];
            self.targets = [];
            break;
          case 'basic':
            preloadConfiguration = self.preloadedConfigurations.basic;
            break;
          case 'chameleon-mini':
            preloadConfiguration = self.preloadedConfigurations.mini;
            break;
          case 'chameleon':
            preloadConfiguration = self.preloadedConfigurations.chameleon;
            break;
        }
        self.sources = preloadConfiguration.source;
        self.targets = preloadConfiguration.target;
      }
      self.loadRoomConfiguration = function(room){
        var preloadConfiguration =[];
        switch(room){
          case '870/123':
            preloadConfiguration = self.roomConfigurations["870/123"];
            break;
        }
        self.sources = preloadConfiguration.source;
        self.targets = preloadConfiguration.target;
        self.unclassified = preloadConfiguration.classification.unclassified;
        self.classified = preloadConfiguration.classification.classified;
        self.spn = preloadConfiguration.classification.spn;

      }
    }
  ])
;
