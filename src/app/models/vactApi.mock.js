'use strict';
/**
 * @ngdoc function
 * @name vactApp.module:vactApiModel
 * @description
 * # vactApiModel
 * mockData for vactApiModel of the vactApp
 */
angular.module('vactApp.mocks')
    .service('vactApiModelMock', ['ROOM_CONFIG_MOCK',
      function vactApiModelMock(ROOM_CONFIG_MOCK) {
        var mockData =
        {
          roomConfiguration: ROOM_CONFIG_MOCK
        };
        console.log("mockData: "+mockData.roomConfiguration.source[0].type);
        return mockData;
      }])
;
