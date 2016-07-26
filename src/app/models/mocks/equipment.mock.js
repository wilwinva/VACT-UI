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
          "bldg":"870",
          "room":"123",
          "vactType":"chameleon",
          "source": [
            {
              "type": "laptop",
              "label": "Laptop 1",
              "id": "laptop1",
              "target": "lcd2"
            },
            {
              "type": "laptop",
              "label": "Laptop 2",
              "id": "laptop2",
              "target": "none"
            },
            {
              "type": "laptop",
              "label": "Laptop 3",
              "id": "laptop3",
              "target": "none"
            },
            {
              "type": "laptop",
              "label": "Laptop 4",
              "id": "laptop4",
              "target": "none"
            },
            {
              "type": "desktop",
              "label": "Desktop 1",
              "id": "desktop1",
              "target": "none"
            },
            {
              "type": "document_camera",
              "label": "Doc Cam 1",
              "id": "doccam1",
              "target": "none"
            },
            {
              "type": "document_camera",
              "label": "Doc Cam 2",
              "id": "doccam2",
              "target": "none"
            },
            {
              "type": "video_camera",
              "label": "Cam 1",
              "id": "vidcam1",
              "target": "lcd1"
            },
            {
              "type": "video_camera",
              "label": "Cam 2",
              "id": "vidcam2",
              "target": "none"
            }

          ],
          "target": [
            {
              "type": "lcd",
              "label": "LCD 1",
              "id": "lcd1",
              "source": "vidcam1"
            },
            {
              "type": "lcd",
              "label": "LCD 2",
              "id": "lcd2",
              "source": "laptop1"
            },
            {
              "type": "plasma",
              "label": "Plasma 1",
              "id": "plasma1",
              "source": "none"
            },
            {
              "type": "projector",
              "label": "Projector 1",
              "id": "projector1",
              "source": "none"
            }
          ]
        }
    );
