/**
 * Command options for cameras
 */
'use strict';

angular.module('vactApp.hardwareCommands')
    .directive('vactCamera', function(){
        return {
            restrict: false,
            replace: true,
            scope: {

            },
            templateUrl: 'src/app/components/hardwareControls/camera.tpl.html',
            controller: 'vactCameraCtrl',
            controllerAs: 'camera'
        }
    })
    .controller('vactCameraCtrl', function () {

        // Save preset data to given camera
        this.presetStore = function (cameraId, data) {

        };

        // Activate a preset
        this.presetActivate = function (presetNum) {
            // A preset id contains all preset info, including camera source
        };

        // Clear a preset from memory
        this.presetClear = function (presetNum) {

        };

        // Move or tilt the camera up, down, left, right
        this.pan = function (cameraId, direction) {

        };

        // Zoom the camera in or out
        this.zoom = function (cameraId, zoomIn) {
            var zoom = zoomIn ? 'zoom+' : 'zoom-';
            return {command: cameraId, data: {options: {move: zoom}}};
        };

        // Stop all actions on the camera (moving and zooming)
        this.stop = function (cameraId) {
            return {command: cameraId, data: {options: {move: "stop"}}};
        };
    });
