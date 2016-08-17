'use strict';

/**
 * @ngdoc overview
 * @project VACT
 * @name AdminCtrl
 * @description methods and properties for the admin page - create/modify/save room configurations AND validate room stats (Iguana Version, equipment temps/serial numbers)
 *
 * Admin control methods
 */
'use strict';

angular.module('vactApp')
    .controller('AdminCtrl', ['vactModel', 'equipmentList', 'INSTALLED', 'vactRoomList', 'vactRoomTemps', 'vactRoomSerials', 'vactRoomIguanaVersion', function (vactModel, equipmentList, INSTALLED, vactRoomList, vactRoomTemps, vactRoomSerials, vactRoomIguanaVersion) {
/*      console.log('made it in adminCtrl');*/
      var self = this;

    /**
     * @classdesc - Initalize local variables
     */
      self.isClient = INSTALLED.isClient;
      self.roomState = '';
      self.activeRoom = '';
      self.selectedBldg = '';
      self.selectedRoom = '';
      self.roomType = '';
      self.bldgs = [];
      self.rooms = [];
      self.roomStateOptions = [{'label':'Validate a room','id':'validation'},{'label':'Create a room configuration','id':'createConfiguration'},{'label':'Manage a room configuration','id':'manageConfiguration'}];
      self.vactRooms = vactRoomList;

      for(var iBldg=0;iBldg<self.vactRooms.length;iBldg++){
        var bldg = self.vactRooms[iBldg].bldg;
        if(self.bldgs.indexOf(bldg) < 0){
          self.bldgs.push(bldg);
        }
      }

/** @classdesc - room validation variables */
      self.vactRoomIguanaVersions = vactRoomIguanaVersion;
      self.currentIguanaVersion = '';
      self.igunanVersions = [{'label': 'v12.5.3','data':'v12.5.3'},{'label': 'v12.5.2','data':'v12.5.2'},{'label': 'v12.4.9','data':'v12.4.9'}];
      self.newestIguanaVersion = self.igunanVersions[0].label;
      self.updateIguana = false;

      self.vactRoomTemps = vactRoomTemps;
      self.equipmentTemps =  [];
      self.getTemps = false;

      self.vactRoomSerials = vactRoomSerials;
      self.equipmentSerials = [];
      self.getSerials = false;
      self.serialsLoaded = false;

/** @classdesc - room configuration variables */
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


    /**
     * @classdesc - Load current room state
     * @constructor
     * @param {string} roomState - The roomState what you want to do to a room (validate, manage configuration)
     */
      self.loadRoomState = function(roomState){
        self.roomState = roomState;
        self.sources = [];
        self.targets = [];
        self.roomConfiguration = '';
        self.activeRoom = '';
        self.selectedBldg = '';
        self.selectedRoom = '';
        if( self.isClient){
          self.activeRoom = INSTALLED.bldg + "/" + INSTALLED.room;
          self.openRoomSocket(self.activeRoom);
          self.loadRoomIguanaVersion();
          self.getRoomType();
          self.loadRoomConfiguration();
        }else{
          self.activeRoom = '';
        }

      };

  /*room validation method/properties - start*/

      /**
       * Load list of rooms base on bldg
       * @constructor
       * @param {string} bldg
       */
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

      /**
       * get room configuration type based on self.activeRoom
       * @constructor
       */
      self.getRoomType = function(){
        for(var iBldg=0;iBldg<self.vactRooms.length;iBldg++){
          var brObj = self.vactRooms[iBldg];
          if(brObj.label === self.activeRoom){
            self.roomType=brObj.type;
            break;
          }
        }
      };

      /**
       * set self.activeRoom, fires self.getRoomType and self.loadRoomIguanaVersion methods
       * self.activeRoom is a bld/room combo used as a unique identifier
       * @constructor
       */
      self.setBldgRooms = function(){
        self.activeRoom = self.selectedBldg + "/" + self.selectedRoom;
        self.getRoomType();
        self.loadRoomIguanaVersion();
      };

      /**
       * open a socket based on room provided
       * @constructor
       * @param {string} room - this is really a bld/room combo used as a unique identifier
       */
      self.openRoomSocket = function(room){
        self.activeRoom = room;
        /*window.alert(self.activeRoom);*/
      };

      /**
       * set Iguana Version based on self.activeRoom
       * set self.iguanaUpToDate text field to show where current iguana version is in relationship to list of versions
       * @constructor
       */
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

      /**
       * update Iguana Version for self.activeRoom
       * set self.iguanaUpToDate text field to show where current iguana version is in relationship to list of versions
       * @constructor
       */
      self.updateIguanaVersion = function(newIguanaVersion){
        //window.alert(newIguanaVersion);
        self.currentIguanaVersion = newIguanaVersion;
        self.iguanaUpToDate = 'Current Iguana version ' + '(' + self.currentIguanaVersion + ') ';
        self.iguanaUpToDate += (self.currentIguanaVersion === self.newestIguanaVersion?'is up to date':'is behind the latest version');
      };

      /**
       * button action to show/hide equipment temps
       * if temps are visible reload new temps - need to repull temps each time clicked
       * @constructor
       */
      self.getTempData = function() {
        if (self.getTemps) {
          /*hide temps*/
          self.getTemps = false;
        } else {
          /*ajax in room equipment temps*/
          console.log('ajax in room equipment temps');
          self.loadRoomTemps();
          self.getTemps = true;
        }
      };

      /**
       * self.loadRoomTemps
       * build list of current equipment temps for self.activeRoom
       * @constructor
       */
      self.loadRoomTemps = function(){
        for(var iRR=0;iRR<self.vactRoomTemps.length;iRR++){
          var vrrObj = self.vactRoomTemps[iRR];
          if(vrrObj.room === self.activeRoom){
            self.equipmentTemps=vrrObj.temps;
            break;
          }
        }
      };

      /**
       * button action to show/hide equipment serial numbers
       * if temps are NOT visible get serial numbers - only need to pull once
       * @constructor
       */
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

      /**
       * self.loadRoomSerials
       * build list of current equipment serial numbers for self.activeRoom
       * @constructor
       */
      self.loadRoomSerials = function(){
        for(var iRS=0;iRS<self.vactRoomSerials.length;iRS++){
          var vrsObj = self.vactRoomSerials[iRS];
          if(vrsObj.room === self.activeRoom){
            self.equipmentSerials=vrsObj.serials;
            break;
          }
        }
      };

      /**
       * determines if this is a local or remote access
       * @constructor
       */
      if( self.isClient){
        self.openRoomSocket(self.activeRoom);
        self.loadRoomIguanaVersion();
      }
  /*room validation methods/properties - end*/

  /*room configuration methods/properties - start*/

      /**
       * radio button selection that displays which dropdown list of equipment via self.findEquipmentObjByReference
       * build list of current equipment serial numbers for self.activeRoom
       * @constructor
       * @param {string} equipment
       * @param {string} equipmentGroup
       */
      self.equipmentSelected = function(equipment, equipmentGroup){
/*        console.log('made it in equipmentSelected:'+equipment);*/
        self.equipmentCount = 0;
        self.equipmentGroup = equipmentGroup;
        self.findEquipmentObjByReference(equipment, equipmentGroup);
        self.showEquipmentSpecifics = true;
      };

      /**
       * build list of current equipment serial numbers for self.activeRoom
       * @constructor
       * @param {string} equipment
       * @param {string} equipmentGroup
       */
      self.findEquipmentObjByReference = function(equipmentType, equipmentGroup){
        var arrayToSearch = [];
        /**
         * set arrayToSearch based on equipmentGroup
         */
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

        /**
         * load newObj
         */
        var newObj = {};
        for(var i=0;i<arrayToSearch.length;i++){
          if(arrayToSearch[i].type === equipmentType){
            newObj = arrayToSearch[i];
          }
        }
        /**
         * decide if equipmentGroup is a target or source
         */
        if(equipmentGroup === 'displays'){
          arrayToSearch = self.targets;
        }else{
          arrayToSearch = self.sources;
        }
        self.destinationArray = arrayToSearch;

        /**
         * set count of equiptment type - used in label and id
         */
        var increment = 1;
        if(arrayToSearch.length > 0){
          for(var a=0;a<arrayToSearch.length;a++){
            if(arrayToSearch[a].type === equipmentType){
              increment++;
            }
          }
        }
        /**
         * set variables used to DISPLAY equipment stats
         */
        self.tempObj = newObj;
        self.equipmentCount = increment;
        self.equipmentType = newObj.type;
        self.equipmentLabel = newObj.label + ' ' + increment;
        self.equipmentId = newObj.id + '_' + increment;
      };

      /**
       * save equipment to destinationArray (source or target)
       * @constructor
       */
      self.saveEquipment = function(){
        var newEquipment = {};
        newEquipment.type = self.equipmentType;
        newEquipment.label = self.equipmentLabel;
        newEquipment.id = self.equipmentId;
        newEquipment.secured = self.equipmentSecured;
        self.destinationArray.push(newEquipment);
        self.addAnother = true;
      };

      /**
       * add another of same equipment to destinationArray (source or target) but increment by 1
       * @constructor
       */
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

      /**
       * clear  equipment variables
       * @constructor
       */
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

      /**
       * load source and target equipment arrays based on configurationType from dropdown
       * @constructor
       * @param {string} configurationType
       */
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

      /**
       * load source and target equipment arrays based on saved room configuration
       * @constructor
       * @param {string} configurationType
       */
      self.loadRoomConfiguration = function(){
/*        if(self.selectedBldg.length===0 || self.selectedRoom.length===0){
          return;
        }*/
        if(self.activeRoom === '') {
          self.activeRoom = self.selectedBldg + "/" + self.selectedRoom;
        }
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
