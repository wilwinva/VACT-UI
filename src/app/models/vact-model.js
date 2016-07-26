'use strict';

/**
 * @ngdoc function
 * @name insideApp.module:models.insideApiModel
 * @description
 * # Models.insideApiModel
 * snl Model of the insideApp
 */
angular.module('vactApp.models.vactApi', ['vactApp.mocks'])
    .service('vactApiModel', ['$q', 'vactApiModelMock',
      function VactApiModel($q, vactApiModelMock) {
        var vactApiModel = this;

        vactApiModel.fetch = function (service) {
          console.log('Retrieving vact mock model data for ' + service);
          //read local data from vactApiModel mock
          return $q.when(vactApiModelMock[service]);
        };
      }
    ]);

