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
              "type": "document_camera",
              "name": "documentCamera1"
            },
            {
              "type": "document_camera",
              "name": "documentCamera2"
            },
            {
              "type": "video_camera",
              "name": "videoCamera1"
            },
            {
              "type": "video_camera",
              "name": "video camera 2"
            }

          ],
          "target": [
            {
              "type": "lcd",
              "name": "lcd 1"
            },
            {
              "type": "lcd",
              "name": "lcd 2"
            },
            {
              "type": "plasma",
              "name": "plasma 1"
            },
            {
              "type": "projector",
              "name": "projector 1"
            }
          ]
        }
    );
