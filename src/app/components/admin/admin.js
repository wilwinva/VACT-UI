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
        self.equipmentList = equipmentList;
    }
    ])
;
