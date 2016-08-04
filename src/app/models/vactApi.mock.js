'use strict';
/**
 * @ngdoc function
 * @name vactApp.module:vactApiModel
 * @description
 * # vactApiModel
 * mockData for vactApiModel of the vactApp
 */
angular.module('vactApp.mocks')
    .service('vactApiModelMock', ['ROOM_CONFIG_MOCK', 'EQUIPMENT_LIST_MOCK', 'VACT_ROOM_LIST_MOCK', 'VACT_ROOM_TEMPS_MOCK', 'VACT_ROOM_SERIALS_MOCK', 'VACT_ROOM_IGUANA_VERSIONS_TEMPS_MOCK',
      function vactApiModelMock(ROOM_CONFIG_MOCK,EQUIPMENT_LIST_MOCK,VACT_ROOM_LIST_MOCK,VACT_ROOM_TEMPS_MOCK,VACT_ROOM_SERIALS_MOCK,VACT_ROOM_IGUANA_VERSIONS_TEMPS_MOCK) {
        var mockData =
        {
          roomConfiguration: ROOM_CONFIG_MOCK,
          equipmentList: EQUIPMENT_LIST_MOCK,
          vactRoomList: VACT_ROOM_LIST_MOCK,
          vactRoomTemps:VACT_ROOM_TEMPS_MOCK,
          vactRoomSerials:VACT_ROOM_SERIALS_MOCK,
          vactRoomIguanaVersion:VACT_ROOM_IGUANA_VERSIONS_TEMPS_MOCK
        };
        console.log("mockData: "+mockData.roomConfiguration.source[0].type);
        return mockData;
      }])
;
