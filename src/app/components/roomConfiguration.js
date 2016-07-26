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
    .controller('RoomConfigurationCtrl', ['vactModel', 'equipmentData', function (vactModel, equipmentData) {
        var self = this;

        self.room_properties = equipmentData;
        self.sources = self.room_properties.source;
        self.targets = self.room_properties.target;
        self.configuration = self.room_properties.configuration;

        var emptySet = {"type": "none", "label": "None", "id": "none", "source": ""};
        self.sources.push(emptySet);
        self.targets.push(emptySet);

        self.targetSelected = function (source, targetId) {
            var sourceId = source.id;
            //need to test for targets displaying something already
            var inUse = false;
            for (var i = 0; i < self.configuration.length; i++) {
                if (self.configuration[i].target === targetId) {
                    inUse = true;
                    if (window.confirm(targetId + " is already in use. Would you like to display this instead?")) {
                        self.configuration.splice(i);
                        //TODO: do we need to send a message when we move something off of the display
                        inUse = false;
                    }
                    break;
                }
            }

            if (!inUse) {
                var sendObj = self.buildSendObj(sourceId, targetId);
                self.configuration.push(sendObj);
                console.log('sendObj: ' + sendObj);
            }
        };

        self.sourceSelected = function (target, sourceId) {
            //sources can be displayed on multiple targets
            var targetId = target.id;
            var sendObj = self.buildSendObj(sourceId, targetId);
            self.configuration.push(sendObj);
            console.log('sendObj: ' + sendObj);
        };

        self.buildSendObj = function (sourceId, targetId) {
            var sendObj = {source: sourceId, target: targetId};
            vactModel.sendRequest(sendObj);
            window.alert(sendObj);
            return sendObj;
        };

        self.filterNone = function (menuItem) {
            return menuItem.id === "none" ? false : true;
        };
    }])
;
