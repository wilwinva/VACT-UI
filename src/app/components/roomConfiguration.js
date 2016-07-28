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
        self.room_classifications = [{"label": "Unclassified", "id": 0}, {
            "label": "Classified",
            "id": 1
        }, {"label": "SPN", "id": 2}];
        self.room_properties = equipmentData;
        self.sources = self.room_properties.source;
        self.targets = self.room_properties.target;

        self.setRoomClassification = function (room_classification) {
            self.room_classification = room_classification;
            var sendObj = {event: 'classification', status: self.room_classifications[room_classification].label};
            vactModel.sendRequest(sendObj);
        };

        self.targetSelected = function (source) {
            var newTargetId = source.target,
                prevTargetId = source.inUse,
                targetInUse = false;
            //prevTargetId === 'none' ? false : true;

            // a target can only have one source
            for (var tIndex = 0; tIndex < self.targets.length; tIndex++) {
                if (self.targets[tIndex].id === newTargetId) {
                    if (self.targets[tIndex].source && self.targets[tIndex].source !== 'none') {
                        targetInUse = true;

                        if (window.confirm(newTargetId + ' is already in use. Would you like to display this instead?')) {
                            //TODO: do we need to send a message when we move something off of the display
                            targetInUse = false;
                            self.targets[tIndex].source = source.id;
                            self.targets[tIndex].inUse = source.id;
                        }
                    }
                    else {
                        self.targets[tIndex].source = source.id;
                        self.targets[tIndex].inUse = source.id;
                    }
                    break;
                }
            }

            //TODO: also reset the prevTarget

            if (!targetInUse) {
                var sendObj = self.buildSendObj(source.id, source.target);
               //TODO: self.configuration.push(sendObj);
                console.log('sendObj: ' + sendObj);
            }
        };

        self.sourceSelected = function (target) {
            //sources can be displayed on multiple targets
            var targetId = target.id;

            /*  for (var sIndex = 0; sIndex < self.sources.length; sIndex++) {
             if (self.sources[sIndex].id === sourceId) {
             self.sources[sIndex].target = targetId;
             break;
             }
             }
             */
            var sendObj = self.buildSendObj(target.source, targetId);
            //TODO:self.configuration.push(sendObj);
            console.log('sendObj: ' + sendObj);
        };

        self.buildSendObj = function (sourceId, targetId) {
            var sendObj = {event: 'drop', condition_1: sourceId, condition_2: targetId};
            vactModel.sendRequest(sendObj);
            //window.alert(sendObj);
            return sendObj;
        };
    }
    ])
;
