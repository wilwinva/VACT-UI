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
        'vactApp.models'
    ])
    .run(['$rootScope', '$timeout', '$window', '$location', '$state', '$stateParams',
        function ($rootScope, $timeout, $window, $location, $state) {
            $rootScope.angular = angular;
        }
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$sceDelegateProvider', '$locationProvider', 'ENV',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider, $locationProvider, ENV) {
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
                            },
                            function () {
//                              return DEFAULT_PREFERENCE_DATA;
                            });
                      }]
                    }
                });
        }
    ])
;
