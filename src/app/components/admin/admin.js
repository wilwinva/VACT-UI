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
    .controller('AdminCtrl', ['vactModel', 'equipmentList', 'INSTALLED', 'vactRoomList', 'vactRoomTemps', 'vactRoomSerials', 'vactRoomIguanaVersion', function (vactModel, equipmentList, INSTALLED, vactRoomList, vactRoomTemps, vactRoomSerials, vactRoomIguanaVersion) {
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
        self.activeRoom = '';
        self.selectedBldg = '';
        self.selectedRoom = '';
      };

  /*room validation method/properties - start*/
      self.activeRoom = '';
      self.selectedBldg = '';
      self.selectedRoom = '';
      self.roomType = '';
      self.bldgs = [];
      self.rooms = [];
//      self.rooms = [{'label':'870/123','bldg':'870','room':'123','type':'n/a'},{"label":"518/1026","bldg":"518","room":"1026","type":"n/a"},{"label":"700/1028","bldg":"700","room":"1028","type":"Presentation"},{"label":"701/1001","bldg":"701","room":"1001","type":"n/a"},{"label":"701/2001","bldg":"701","room":"2001","type":"Chameleon 1.0"},{"label":"702/1001","bldg":"702","room":"1001","type":"Chameleon 2.0"},{"label":"702/1029","bldg":"702","room":"1029","type":"Presentation"},{"label":"703/111","bldg":"703","room":"111","type":"Presentation"},{"label":"704/218","bldg":"704","room":"218","type":"Chameleon 2.0"},{"label":"729/203","bldg":"729","room":"203","type":"Mini-Chameleon"},{"label":"730/1205","bldg":"730","room":"1205","type":"Basic"}];
      self.vactRooms = vactRoomList;

      for(var iBldg=0;iBldg<self.vactRooms.length;iBldg++){
        var bldg = self.vactRooms[iBldg].bldg;
        if(self.bldgs.indexOf(bldg) < 0){
          self.bldgs.push(bldg);
        }
      }

      self.getBldgRooms = function(bldg){
        //self.rooms = self.vactRooms.filter(bldg);
        self.rooms = [];
        for(var iBldg=0;iBldg<self.vactRooms.length;iBldg++){
          var brObj = self.vactRooms[iBldg];
          if(brObj.bldg === bldg){
            self.rooms.push(brObj.room);
          }
        }
      };
      self.getRoomType = function(){
        for(var iBldg=0;iBldg<self.vactRooms.length;iBldg++){
          var brObj = self.vactRooms[iBldg];
          if(brObj.label === self.activeRoom){
            self.roomType=brObj.type;
            break;
          }
        }
      };
      self.setBldgRooms = function(){
        self.activeRoom = self.selectedBldg + "/" + self.selectedRoom;
        self.getRoomType();
        self.loadRoomIguanaVersion();
      };


      if( self.isClient){
        self.activeRoom = INSTALLED.bldg + "/" + INSTALLED.room;
      }

      self.openRoomSocket = function(room){
        self.activeRoom = room;
        window.alert(self.activeRoom);
      };

      if( self.isClient){
        self.openRoomSocket(self.activeRoom);
        self.loadRoomIguanaVersion();
      }
//      self.equipmentTemps = [{'label':'S4','data':98},{'label':'Tower 1','data':102},{'label':'Tower 2','data':103},{'label':'Stack','data':110}];

      self.vactRoomTemps = vactRoomTemps;
      self.equipmentTemps =  [];
      self.getTemps = false;

      self.getTempData = function() {
        if (self.getTemps) {
          self.getTemps = false;//hide temps
        } else {
          //ajax in room equipment temps
          console.log('ajax in room equipment temps');
          self.loadRoomTemps();
          self.getTemps = true;
        }
      };
      self.loadRoomTemps = function(){
        for(var iRR=0;iRR<self.vactRoomTemps.length;iRR++){
          var vrrObj = self.vactRoomTemps[iRR];
          if(vrrObj.room === self.activeRoom){
            self.equipmentTemps=vrrObj.temps;
            break;
          }
        }
      };

//      self.equipmentSerials = [{'label':'S4','data':'123AS45DF6789'},{'label':'Plasma 1','data':'2024asdf'},{'label':'Tower 2','data':'qwerty19'},{'label':'Stack','data':'psdfer1827jus'}];
      self.vactRoomSerials = vactRoomSerials;
      self.equipmentSerials = [];
      self.getSerials = false;
      self.serialsLoaded = false;
      self.getSerialData = function() {
        if (self.getSerials) {
          self.getSerials = false;//hide serial numbers
        } else {
          if (!self.serialsLoaded) {
            //ajax in room serial numbers
            console.log('ajax in room serial numbers');
            self.loadRoomSerials();
            self.serialsLoaded = true;
          }
          self.getSerials = true;
        }
      };
      self.loadRoomSerials = function(){
        for(var iRS=0;iRS<self.vactRoomSerials.length;iRS++){
          var vrsObj = self.vactRoomSerials[iRS];
          if(vrsObj.room === self.activeRoom){
            self.equipmentSerials=vrsObj.serials;
            break;
          }
        }
      };

      self.vactRoomIguanaVersions = vactRoomIguanaVersion;
//      self.currentIguanaVersion = 'v12.4.9';//vactRoomIguanaVersions
      self.currentIguanaVersion = '';

      self.igunanVersions = [{'label': 'v12.5.3','data':'v12.5.3'},{'label': 'v12.5.2','data':'v12.5.2'},{'label': 'v12.4.9','data':'v12.4.9'}];
      self.newestIguanaVersion = self.igunanVersions[0].label;

      self.loadRoomIguanaVersion = function(){
        for(var iRIV=0;iRIV<self.vactRoomIguanaVersions.length;iRIV++){
          var vrivObj = self.vactRoomIguanaVersions[iRIV];
          if(vrivObj.room === self.activeRoom){
            self.currentIguanaVersion=vrivObj.igunanVersion;
            self.iguanaUpToDate = 'Current Iguana version ' + '(' + self.currentIguanaVersion + ') ';
            self.iguanaUpToDate += (self.currentIguanaVersion === self.newestIguanaVersion?'is up to date':'is behind the latest version');
            break;
          }
        }
      };

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

      self.configurationTypes = [{'label':'','id':''},{'label':'Custom','id':'custom'},{'label':'Basic','id':'basic'},{'label':'Chameleon-Mini','id':'chameleon-mini'},{'label':'Chameleon','id':'chameleon'}];
      self.configurationType = '';
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

      self.loadRoomConfiguration = function(){
        if(self.selectedBldg.length==0 || self.selectedRoom.length==0){
          return;
        }
        self.activeRoom = self.selectedBldg + "/" + self.selectedRoom;
        var preloadConfiguration =[];
        switch(self.activeRoom){
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
