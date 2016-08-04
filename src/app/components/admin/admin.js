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
    .controller('AdminCtrl', ['vactModel', 'equipmentList', 'INSTALLED', function (vactModel, equipmentList, INSTALLED) {
      var self = this;
      self.isClient = INSTALLED.isClient;
//      console.log('made it in adminCtrl');
      self.roomState = '';
      self.roomStateOptions = [{'label':'Validate a room','id':'validation'},{'label':'Create a room configuration','id':'createConfiguration'},{'label':'Manage a room configuration','id':'manageConfiguration'}];
      self.loadRoomState = function(roomState){
        self.roomState = roomState;
        self.sources = [];
        self.targets = [];
        self.roomConfiguration = '';
      };

  /*room validation method/properties - start*/
      self.activeRoom = equipmentList.activeRoom;
      self.validateRooms = [{'label':'870/123','id':'870/123'},{'label':'870/166','id':'870/166'},{'label':'870/201','id':'870/201'},{'label':'870/222','id':'885/222'},{'label':'870/334','id':'885/334'},{'label':'885/109','id':'885/109'},{'label':'885/110','id':'885/110'}];
      if( self.isClient){
        self.activeRoom = INSTALLED.bldg + "/" + INSTALLED.room;
      }

      self.openRoomSocket = function(room){
        self.activeRoom = room;
      };

      if( self.isClient){
        self.openRoomSocket(self.activeRoom);
      }
      self.equipmentTemps = [{'label':'S4','data':98},{'label':'Tower 1','data':102},{'label':'Tower 2','data':103},{'label':'Stack','data':110}];
      self.getTemps = false;

      self.getTempData = function() {
        if (self.getTemps) {
          self.getTemps = false;//hide temps
        } else {
          //ajax in room equipment temps
          console.log('ajax in room equipment temps');
          self.getTemps = true;
        }
      };

      self.equipmentSerials = [{'label':'S4','data':'123AS45DF6789'},{'label':'Plasma 1','data':'2024asdf'},{'label':'Tower 2','data':'qwerty19'},{'label':'Stack','data':'psdfer1827jus'}];
      self.getSerials = false;
      self.serialsLoaded = false;
      self.getSerialData = function() {
        if (self.getSerials) {
          self.getSerials = false;//hide serial numbers
        } else {
          if (!self.serialsLoaded) {
            //ajax in room serial numbers
            console.log('ajax in room serial numbers');
            self.serialsLoaded = true;
          }
          self.getSerials = true;
        }
      };

      self.currentIguanaVersion = 'v12.4.9';
      self.igunanVersions = [{'label': 'v12.5.3','data':'v12.5.3'},{'label': 'v12.5.2','data':'v12.5.2'},{'label': 'v12.4.9','data':'v12.4.9'}];
      self.newestIguanaVersion = self.igunanVersions[0].label;

      self.iguanaUpToDate = 'Current Iguana version ' + '(' + self.currentIguanaVersion + ') ';
      self.iguanaUpToDate += (self.currentIguanaVersion === self.newestIguanaVersion?'is up to date':'is behind the latest version');

      self.updateIguana = false;
      self.updateIguanaVersion = function(newIguanaVersion){
        //window.alert(newIguanaVersion);
        self.currentIguanaVersion = newIguanaVersion;
        self.iguanaUpToDate = 'Current Iguana version ' + '(' + self.currentIguanaVersion + ') is up to date';
      };

  /*room validation method/properties - end*/

  /*room configuration methods/properties - start*/
      self.equipmentLists = equipmentList;

      self.computers = self.equipmentLists.computers;
      self.displays = self.equipmentLists.displays;
      self.cameras = self.equipmentLists.cameras;
      self.peripherals = self.equipmentLists.peripherals;
      self.preloadedConfigurations = self.equipmentLists.preloadedConfigurations;
      self.roomConfigurations = self.equipmentLists.rooms;

      self.configurationTypes = [{'label':'Custom','id':'custom'},{'label':'Basic','id':'basic'},{'label':'Chameleon-Mini','id':'chameleon-mini'},{'label':'Chameleon','id':'chameleon'}];
      self.configurationType = 'custom';
      self.roomConfiguration ='';
      self.unclassified = false;
      self.classified = false;
      self.spn = false;

      self.sources = [];
      self.targets = [];

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
        self.addAnother = false;
        self.computerSelected = '';
        self.displaySelected = '';
        self.cameraSelected = '';
        self.peripheralSelected = '';
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
      };

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

      };
 /*room configuration methods/properties - end*/

    }
  ])
;
