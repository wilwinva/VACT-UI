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
  .controller('EquipmentCtrl', ['iguanaServerModel', 'vactApiModel', function (iguanaServerModel, vactApiModel) {
    var self = this;
    console.log('In Equipment Controller');
    console.log('load john doe');
    self.name = iguanaServerModel;
    console.log('load Equipment');

    self.equipment = vactApiModel.fetch();
  }])
;