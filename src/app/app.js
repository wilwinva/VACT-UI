'use strict';

/**
 * @ngdoc overview
 * @project VACT
 * @name vactApp
 * @description
 * # vactApp
 *
 * Main module of the application.
 */
angular
    .module('vactApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngWebSocket',
        'ngTouch',
        'ngAria',
        'vactApp.config.constants',
        'vactApp.models',
        'vactApp.hardwareCommands'
    ])
    .run(['$rootScope', function ($rootScope) {
            $rootScope.angular = angular;
        }
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.defaults.withCredentials = true; // Allow cookies with ajax

            // For any unmatched url, redirect to the home page
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/components/roomConfiguration.tpl.html',
                    controller: 'RoomConfigurationCtrl as roomCtrl',
                    resolve : {
                      equipmentData: ['vactApiModel','$q', function (vactApiModel, $q) {
                        console.log('in resolve');
                        var defer = $q.defer();
                        defer.resolve(vactApiModel.fetch('roomConfiguration'));

                        return defer.promise.then(function (data) {
                              return data;
                            });
                      }]
                    }
                });
        }
    ])
;
