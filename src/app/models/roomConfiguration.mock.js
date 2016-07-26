'use strict';
/**
 * @ngdoc function
 * @name vactApp.module:roomConfiguration
 * @description
 * # supportTeams
 * mockData for room configuration of the vactApp
 */
angular.module('vactApp.mocks')
    .constant('ROOM_CONFIG_MOCK',
        {
            'bldg': '870',
            'room': '123',
            'vactType': 'chameleon',
            'source': [
                {
                    'type': 'laptop',
                    'label': 'Laptop 1',
                    'id': 'laptop1'
                },
                {
                    'type': 'laptop',
                    'label': 'Laptop 2',
                    'id': 'laptop2'
                },
                {
                    'type': 'laptop',
                    'label': 'Laptop 3',
                    'id': 'laptop3'
                },
                {
                    'type': 'laptop',
                    'label': 'Laptop 4',
                    'id': 'laptop4'
                },
                {
                    'type': 'desktop',
                    'label': 'Desktop 1',
                    'id': 'desktop1'
                },
                {
                    'type': 'document_camera',
                    'label': 'Doc Cam 1',
                    'id': 'doccam1'
                },
                {
                    'type': 'document_camera',
                    'label': 'Doc Cam 2',
                    'id': 'doccam2'
                },
                {
                    'type': 'video_camera',
                    'label': 'Cam 1',
                    'id': 'vidcam1'
                },
                {
                    'type': 'video_camera',
                    'label': 'Cam 2',
                    'id': 'vidcam2'
                }

            ],
            'target': [
                {
                    'type': 'lcd',
                    'label': 'LCD 1',
                    'id': 'lcd1'
                },
                {
                    'type': 'lcd',
                    'label': 'LCD 2',
                    'id': 'lcd2'
                },
                {
                    'type': 'plasma',
                    'label': 'Plasma 1',
                    'id': 'plasma1'
                },
                {
                    'type': 'projector',
                    'label': 'Projector 1',
                    'id': 'projector1'
                }
            ],
            'configuration': [
                {
                    'source': 'laptop1',
                    'target': 'lcd2'
                },
                {
                    'source': 'vidcam1',
                    'target': 'lcd1'
                }

            ]
        }
    );
