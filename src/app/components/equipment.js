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
  .controller('EquipmentCtrl', ['iguanaServerModel', 'equipmentData', function (iguanaServerModel, equipmentData) {
    var self = this;
    console.log('In Equipment Controller');
    console.log('load john doe');
    self.name = iguanaServerModel;
    console.log('load Equipment');

    self.room_properties = equipmentData;
    console.log('loaded Equipment' + self.room_properties);

  }])
;