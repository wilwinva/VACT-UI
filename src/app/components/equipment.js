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
        //console.log('In Equipment Controller');
        //console.log('load john doe');
        self.name = iguanaServerModel;

        //console.log('load Equipment');
        self.room_properties = equipmentData;
        //console.log('loaded Equipment' + self.room_properties);

        self.sources = self.room_properties.source;
        self.targets = self.room_properties.target;

        self.linkedSources = [];
        self.linkedTargets = [];
        //load the linkedTargets from the sources
        for (var i = 0; i < self.sources.length; i++) {
            var target = self.sources[i].target;
            if (target !== 'none') {
                self.linkedTargets.push(target);
            }
        }
        //load the linkedSources from the targets
        for (i = 0; i < self.targets.length; i++) {
            var source = self.targets[i].source;
            if (source !== 'none') {
                self.linkedSources.push(source);
            }
        }

        var emptySet = {"type": "none", "label": "None", "id": "none", "source": ""};
        self.sources.push(emptySet);
        self.targets.push(emptySet);


        self.targetSelected = function (source, target) {
            source = source.id;
            var sendObj;
            //need to test for targets displaying something already
            if (self.linkedTargets.indexOf(target)) {
                sendObj = self.buildSendObj(source, target);
                console.log('sendObj: ' + sendObj);
            } else {
                if (window.confirm(target + " is already in use. Would you like to display this instead?")) {
                    //TODO: need to clear out the other source asset displaying
                    sendObj = self.buildSendObj(source, target);
                    console.log('sendObj: ' + sendObj);
                }
            }
        };

        self.sourceSelected = function (target, source) {
            //sources can be displayed on multiple targets
            target = target.id;
            var sendObj = self.buildSendObj(source, target);
            console.log('sendObj: ' + sendObj);
        };

        self.buildSendObj = function (source, target) {
            var sendObj = "{'source-id':'" + source + "','target-id':'" + target + "'}";
            window.alert(sendObj);
            return sendObj;
        };

        self.filterNone = function (menuItem) {
            return menuItem.id !== "none";
        };
    }])
;
