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
        self.room_classification = 0;
        self.room_classifications = [{"label":"Unclassified","id":0},{"label":"Classified","id":1},{"label":"SPN","id":2}];
        self.setRoomClassification = function(room_classification){
          self.room_classification = room_classification;
        };
        self.room_properties = equipmentData;
        self.sources = self.room_properties.source;
        self.targets = self.room_properties.target;
        self.configuration = self.room_properties.configuration;

        for (var sourceIndex = 0; sourceIndex < self.sources.length; sourceIndex++) {
            var sourceId = self.sources[sourceIndex].id;
            for (var configSourceIndex = 0; configSourceIndex < self.configuration.length; configSourceIndex++) {
                if (self.configuration[configSourceIndex].source === sourceId) {
                    self.sources[sourceIndex].target = self.configuration[configSourceIndex].target;
                    break;
                }
            }
        }

        for (var targetIndex = 0; targetIndex < self.targets.length; targetIndex++) {
            var targetId = self.targets[targetIndex].id;
            for (var configTargetIndex = 0; configTargetIndex < self.configuration.length; configTargetIndex++) {
                if (self.configuration[configTargetIndex].target === targetId) {
                    self.targets[targetIndex].source = self.configuration[configTargetIndex].source;
                    break;
                }
            }
        }

        self.targetSelected = function (source, targetId) {
            var sourceId = source.id;
            //need to test for targets displaying something already
            var inUse = false;

            for (var tIndex = 0; tIndex < self.targets.length; tIndex++) {
                if (self.targets[tIndex].id === targetId) {
                    if (self.targets[tIndex].source && self.targets[tIndex].source !== 'none') {
                        inUse = true;
                        if (window.confirm(targetId + ' is already in use. Would you like to display this instead?')) {
                            //TODO: do we need to send a message when we move something off of the display
                          //self.targets.splice(tIndex);
                            inUse = false;
                            self.targets[tIndex].source = sourceId;
                        }
                    }
                    else {
                        self.targets[tIndex].source = sourceId;
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

            for (var sIndex = 0; sIndex < self.sources.length; sIndex++) {
                if (self.sources[sIndex].id === sourceId) {
                    self.sources[sIndex].target = targetId;
                    break;
                }
            }

            var sendObj = self.buildSendObj(sourceId, targetId);
            self.configuration.push(sendObj);
            console.log('sendObj: ' + sendObj);
        };

        self.buildSendObj = function (sourceId, targetId) {
            var sendObj = {source: sourceId, target: targetId};
            vactModel.sendRequest(sendObj);
            //window.alert(sendObj);
            return sendObj;
        };

        self.filterNone = function (menuItem) {
            return menuItem.id === 'none' ? false : true;
        };
    }
    ])
;
