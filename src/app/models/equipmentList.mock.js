'use strict';
/**
 * @ngdoc function
 * @name vactApp.module:equipmentList
 * @description
 * # supportTeams
 * mockData for equipment list of the vactApp
 */
angular.module('vactApp.mocks')
    .constant('EQUIPMENT_LIST_MOCK',
        {
            'computers': [
                {
                    'type': 'laptop',
                    'label': 'Laptop',
                    'id': 'laptop'
                },
                {
                    'type': 'desktop',
                    'label': 'Desktop',
                    'id': 'desktop'
                }
            ],
            'cameras':[
                {
                    'type': 'document_camera',
                    'label': 'Doc Cam',
                    'id': 'doccam'
                },
                {
                    'type': 'video_camera',
                    'label': 'Cam ',
                    'id': 'vidcam1'
                }
            ],
            'displays': [
                {
                    'type': 'lcd',
                    'label': 'LCD',
                    'id': 'lcd'
                },
                {
                    'type': 'monitor',
                    'label': 'Monitor',
                    'id': 'monitor'
                },
                {
                    'type': 'plasma',
                    'label': 'Plasma',
                    'id': 'plasma'
                },
                {
                    'type': 'projector',
                    'label': 'Projector',
                    'id': 'projector'
                }
            ],
            'peripherals':[
                {
                    'type':'led',
                    'label':'led',
                    'id':'led'
                },
                {
                    'type':'microphone',
                    'label':'microphone',
                    'id':'microphone'
                },
                {
                    'type':'mouse',
                    'label':'mouse',
                    'id':'mouse'
                },
                {
                    'type':'speaker',
                    'label':'speaker',
                    'id':'speaker'
                }




            ]
        }
    );
