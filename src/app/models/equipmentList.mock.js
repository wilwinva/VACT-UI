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
                },
                {
                    'type': 'tower',
                    'label': 'Tower',
                    'id': 'tower'
                }
            ],
            'cameras': [
                {
                    'type': 'document_camera',
                    'label': 'Doc Cam',
                    'id': 'doccam'
                },
                {
                    'type': 'video_camera',
                    'label': 'Static Cam ',
                    'id': 'cam'
                },
                {
                    'type': 'adj_video_camera',
                    'label': 'Adj Cam ',
                    'id': 'vidcam'
                }
            ],
            'displays': [
                {
                    'type': 'monitor',
                    'label': 'Monitor 20"',
                    'id': 'monitor20'
                },
                {
                    'type': 'monitor',
                    'label': 'Monitor 30"',
                    'id': 'monitor30'
                },
                {
                    'type': 'lcd',
                    'label': 'LCD 40"',
                    'id': 'lcd40'
                },
                {
                    'type': 'lcd',
                    'label': 'LCD 60"',
                    'id': 'lcd60'
                },
                {
                    'type': 'plasma',
                    'label': 'Plasma 60"',
                    'id': 'plasma60'
                },
                {
                    'type': 'plasma',
                    'label': 'Plasma 80"',
                    'id': 'plasma80'
                },
                {
                    'type': 'projector',
                    'label': 'Projector',
                    'id': 'projector'
                }
            ],
            'peripherals': [
                {
                    'type': 'led',
                    'label': 'Led',
                    'id': 'led'
                },
                {
                    'type': 'microphone',
                    'label': 'Microphone',
                    'id': 'microphone'
                },
                {
                    'type': 'mouse',
                    'label': 'Mouse',
                    'id': 'mouse'
                },
                {
                    'type': 'speaker',
                    'label': 'Speaker',
                    'id': 'speaker'
                }
            ],
            'preloadedConfigurations':[
                {
                    'Empty':[]
                },
                {
                    'Basic':[
                        {
                          'vactType':'basic'
                        },
                        {
                            'source': [
                                {
                                    'type': 'video_camera',
                                    'label': 'Cam 1',
                                    'id': 'vidcam1',
                                    'target': 'lcd1',
                                    'inUse': 'lcd1'
                                }
                            ]
                        },
                        {
                            'target': [
                                {
                                    'type': 'lcd',
                                    'label': 'LCD 1',
                                    'id': 'lcd1',
                                    'source': 'vidcam1',
                                    'inUse': 'vidcam1'
                                },
                                {
                                    'type': 'lcd',
                                    'label': 'LCD 2',
                                    'id': 'lcd2',
                                    'source': 'none',
                                    'inUse': 'none'
                                }
                            ]
                        }
                    ]
                },
                {
                    'Chameleon-Mini':[
                        {
                            'vactType':'chameleon-mini'
                        },
                        {
                            'source': [
                                {
                                    'type': 'desktop',
                                    'label': 'Desktop 1',
                                    'id': 'desktop1',
                                    'target': 'none',
                                    'inUse': 'none'
                                },
                                {
                                    'type': 'video_camera',
                                    'label': 'Cam 1',
                                    'id': 'vidcam1',
                                    'target': 'lcd1',
                                    'inUse': 'lcd1'
                                }
                            ]
                        },
                        {
                            'target': [
                                {
                                    'type': 'lcd',
                                    'label': 'LCD 1',
                                    'id': 'lcd1',
                                    'source': 'vidcam1',
                                    'inUse': 'vidcam1'
                                },
                                {
                                    'type': 'lcd',
                                    'label': 'LCD 2',
                                    'id': 'lcd2',
                                    'source': 'laptop1',
                                    'inUse': 'laptop1'
                                }
                            ]
                        }
                    ]
                },
                {
                    'Chameleon':[
                        {
                            'vactType': 'chameleon'
                        },
                        {
                            'source': [
                                {
                                    'type': 'laptop',
                                    'label': 'Laptop 1',
                                    'id': 'laptop1',
                                    'target': 'lcd2',
                                    'inUse': 'lcd2'
                                },
                                {
                                    'type': 'laptop',
                                    'label': 'Laptop 2',
                                    'id': 'laptop2',
                                    'target': 'none',
                                    'inUse': 'none'
                                },
                                {
                                    'type': 'laptop',
                                    'label': 'Laptop 3',
                                    'id': 'laptop3',
                                    'target': 'none',
                                    'inUse': 'none'
                                },
                                {
                                    'type': 'laptop',
                                    'label': 'Laptop 4',
                                    'id': 'laptop4',
                                    'target': 'none',
                                    'inUse': 'none'
                                },
                                {
                                    'type': 'desktop',
                                    'label': 'Desktop 1',
                                    'id': 'desktop1',
                                    'target': 'none',
                                    'inUse': 'none'
                                },
                                {
                                    'type': 'document_camera',
                                    'label': 'Doc Cam 1',
                                    'id': 'doccam1',
                                    'target': 'none',
                                    'inUse': 'none'
                                },
                                {
                                    'type': 'document_camera',
                                    'label': 'Doc Cam 2',
                                    'id': 'doccam2',
                                    'target': 'none',
                                    'inUse': 'none'
                                },
                                {
                                    'type': 'video_camera',
                                    'label': 'Cam 1',
                                    'id': 'vidcam1',
                                    'target': 'lcd1',
                                    'inUse': 'lcd1'
                                },
                                {
                                    'type': 'video_camera',
                                    'label': 'Cam 2',
                                    'id': 'vidcam2',
                                    'target': 'none',
                                    'inUse': 'none'
                                }
                            ]
                        },
                        {
                            'target': [
                                {
                                    'type': 'lcd',
                                    'label': 'LCD 1',
                                    'id': 'lcd1',
                                    'source': 'vidcam1',
                                    'inUse': 'vidcam1'
                                },
                                {
                                    'type': 'lcd',
                                    'label': 'LCD 2',
                                    'id': 'lcd2',
                                    'source': 'laptop1',
                                    'inUse': 'laptop1'
                                },
                                {
                                    'type': 'plasma',
                                    'label': 'Plasma 1',
                                    'id': 'plasma1',
                                    'source': 'none',
                                    'inUse': 'none'
                                },
                                {
                                    'type': 'projector',
                                    'label': 'Projector 1',
                                    'id': 'projector1',
                                    'source': 'none',
                                    'inUse': 'none'
                                }
                            ]
                        }

                    ]
                }
            ]
        }
    );
