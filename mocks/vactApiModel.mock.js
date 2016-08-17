'use strict';
/**
 * @ngdoc function
 * @name vactApp.module:vactApiModel
 * @description
 * # vactApiModel
 * mockData for vactApiModel of the vactApp
 */
angular.module('vactApp.mocks', [])
    .service('vactApiModelMock', ['EQUIPMENT_MOCK',
      function vactApiModelMock(EQUIPMENT_MOCK) {
        var mockData =
        {
          equipment: EQUIPMENT_MOCK
        };
        return mockData;
      }])
;
