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
    .controller('RoomConfigurationCtrl', ['iguanaServerModel', 'equipmentData', function (iguanaServerModel, equipmentData) {
        var self = this;
        var igServer = iguanaServerModel;
        //TODO: igServer.post('{name: "John Doe"}');

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
                if (self.configuration[i].target == targetId) {
                    inUse = true;
                    if (confirm(targetId + " is already in use. Would you like to display this instead?")) {
                        var sendObj = self.buildSendObj(sourceId, targetId);
                        console.log('sendObj: ' + sendObj);
                        self.configuration.splice(i);
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
            var sendObj = "{'source':'" + sourceId + "','target':'" + targetId + "'}";
            alert(sendObj);
            return sendObj;
        };

        self.filterNone = function (menuItem) {
            return menuItem.id == "none" ? false : true;
        }
    }])
;
