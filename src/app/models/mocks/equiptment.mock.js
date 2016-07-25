'use strict';
/**
 * @ngdoc function
 * @name vactApp.module:supportTeams
 * @description
 * # supportTeams
 * mockData for supportTeams of the vactApp
 */
angular.module('vactApp.mocks')
    .constant('EQUIPMENT_MOCK',
        {
          "source": [
            {
              "type": "laptop",
              "name": "laptop1"
            },
            {
              "type": "laptop",
              "name": "laptop2"
            },
            {
              "type": "laptop",
              "name": "laptop3"
            },
            {
              "type": "laptop",
              "name": "laptop4"
            },
            {
              "type": "desktop",
              "name": "desktop1"
            },
            {
              "type": "document camera",
              "name": "documentCamer1"
            },
            {
              "type": "document camera",
              "name": "documentCamer2"
            },
            {
              "type": "video camera",
              "name": "videoCamera1"
            },
            {
              "type": "video camera",
              "name": "video camera 2"
            }

          ],
          "target": [
            {
              "type": "lcd monitor",
              "name": "lcd monitor 1"
            },
            {
              "type": "lcd monitor",
              "name": "lcd monitor 2"
            },
            {
              "type": "lcd monitor",
              "name": "lcd monitor 3"
            },
            {
              "type": "projector",
              "name": "projector 1"
            }
          ]
        }
    );
