/**
 * Command options for cameras
 */
'use strict';

var cmdsCamera = {

    // Presets
    presetStore: function(cameraId, data){

    },
    presetActivate: function(presetNum){
       // A preset id contains all preset info, including camera source
    },
    presetClear: function(presetNum){

    },

    // Movements
    pan: function(cameraId, direction){

    },
    zoom: function(cameraId, zoomIn){
        var zoom = zoomIn ? 'zoom+' : 'zoom-';
        return {command: cameraId, data:{options:{move:zoom}}};
    },
    stop: function(cameraId){
        return {command: cameraId, data:{options:{move:"stop"}}};
    },

    // VACT example commands
    far_preset_activate: function() {
        return {command:"far_preset",data:{options:{go:this.preset}}};
    },
    far_preset_store: function() {
        return {command:"far_preset_store",data:{options:{set:this.preset}}};
    },
    far_select_source: function() {
        return {command:"far_select_source",data:{options:{far:this.source}}};
    },
    fecc_up: function() {
        return {command:"far_camera_move",data:{options:{move:"up"}}};
    },
    fecc_down: function() {
        return {command:"far_camera_move",data:{options:{move:"down"}}};
    },
    fecc_left: function() {
        return {command:"far_camera_move",data:{options:{move:"left"}}};
    },
    fecc_right: function() {
        return {command:"far_camera_move",data:{options:{move:"right"}}};
    },
    fecc_zoom_in: function() {
        return {command:"far_camera_move",data:{options:{move:"zoom+"}}};
    },
    fecc_zoom_out: function() {
        return {command:"far_camera_move",data:{options:{move:"zoom-"}}};
    },
    fecc_stop: function() {
        return {command:"far_camera_move",data:{options:{move:"stop"}}};
    },
    pan_left: function() {
        return {command:"camera_move",data:{options:{move:"left"}}};
    },
    pan_right: function() {
        return {command:"camera_move",data:{options:{move:"right"}}};
    },
    pan_stop: function() {
        return {command:"camera_stop"};
    },
    preset_activate: function() {
        return {command:"preset_activate",data:{options:{go:this.preset}}};
    },
    preset_store: function() {
        return {command:"preset_store",data:{options:{set:this.preset}}};
    },
    tilt_up: function() {
        return {command:"camera_move",data:{options:{move:"up"}}};
    },
    tilt_down: function() {
        return {command:"camera_move",data:{options:{move:"down"}}};
    },
    tilt_stop: function() {
        return {command:"camera_stop"};
    },
    zoom_in: function() {
        return {command:"camera_move",data:{options:{move:"zoom+"}}};
    },
    zoom_out: function() {
        return {command:"camera_move",data:{options:{move:"zoom-"}}};
    },
    zoom_stop: function() {
        return {command:"camera_stop"};
    },
}
