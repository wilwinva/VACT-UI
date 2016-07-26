'use strict';

/**
 * @ngdoc overview
 * @project VACT
 * @name WebSocketService
 * @description
 * # WebSocketService
 *
 * Web Socket Service
 */
angular.module('vactApp.models')
    /*.factory('iguanaServerModel',['$window', function ($window) {
        var collection = [];
        $window.WebSocket = $window.WebSocket || $window.MozWebSocket;

        var connection = new WebSocket('ws://127.0.0.1:1337');

        connection.onopen = function () {
            console.log('Connection ready');

            connection.send(JSON.stringify({name: 'John Doe'}));
        };

        connection.onerror = function (error) {
            console.log('error', error);
        };

        connection.onmessage = function (message) {
            try {
                var json = JSON.parse(message.data);
                console.log(json);
                collection.push(json);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', message.data);
            }
        };

        var methods = {
            collection: collection,
            get: function() {
                var dataStream;
                dataStream.send(JSON.stringify({ action: 'get' }));
            }
        };

        return methods;
    }])
    .factory('iguanaModel', ['$q', '$rootScope', function ($q, $rootScope) {
    var IguanaModel = {};
    // Keep all pending requests here until they get responses
    var callbacks = {};
    // Create a unique callback ID to map requests to responses
    var currentCallbackId = 0;
    // Create our websocket object with the address to the websocket
    var ws = new WebSocket("ws://localhost:8000/socket/");

    ws.onopen = function () {
    console.log("Socket has been opened!");
    };

    ws.onmessage = function (message) {
    listener(JSON.parse(message.data));
    };

    function sendRequest(request) {
    var defer = $q.defer();
    var callbackId = getCallbackId();
    callbacks[callbackId] = {
    time: new Date(),
    cb: defer
    };
    request.callback_id = callbackId;
    console.log('Sending request', request);
    ws.send(JSON.stringify(request));
    return defer.promise;
    }

    function listener(data) {
    var messageObj = data;
    console.log("Received data from websocket: ", messageObj);
    // If an object exists with callback_id in our callbacks object, resolve it
    if (callbacks.hasOwnProperty(messageObj.callback_id)) {
    console.log(callbacks[messageObj.callback_id]);
    $rootScope.$apply(callbacks[messageObj.callback_id].cb.resolve(messageObj.data));
    delete callbacks[messageObj.callbackID];
    }
    }

    // This creates a new callback ID for a request
    function getCallbackId() {
    currentCallbackId += 1;
    if (currentCallbackId > 10000) {
    currentCallbackId = 0;
    }
    return currentCallbackId;
    }

    // Define a "getter" for getting customer data
    IguanaModel.getCustomers = function () {
    var request = {
    type: "get_customers"
    };
    // Storing in a variable for clarity on what sendRequest returns
    var promise = sendRequest(request);
    return promise;
    };

    return IguanaModel;
    }])
    .factory('iguanaModel', function($websocket){
        var dataStream = $websocket('ws://localhost:1337');

        var collection = [];

        dataStream.onMessage(function(message) {
            collection.push(JSON.parse(message.data));
        });

        var methods = {
            collection: collection,
            get: function() {
                dataStream.send(JSON.stringify({ action: 'get' }));
            }
        };

        return methods;
    })*/
    .factory('vactModel', ['$q', '$rootScope', function ($q, $rootScope) {

        var VactModel = {}; // We return this object to anything injecting our service
        var callbacks = {}; // Keep all pending requests here until they get responses
        var currentCallbackId = 0; // Create a unique callback ID to map requests to responses
        var ws = new WebSocket("ws://localhost:1337"); // Create our websocket object with the address to the websocket

        ws.onopen = function () {
            console.log("VACT: Socket has been opened!");
        };
        ws.onclose = function () {
            console.log("VACT: Socket has been closed!");
        };
        ws.onmessage = function (message) {
            console.log("VACT: message has been received!");
            listener(JSON.parse(message.data));
        };

        VactModel.sendRequest = function(request) {
            var defer = $q.defer();
            var callbackId = getCallbackId();
            callbacks[callbackId] = {
                time: new Date(),
                cb: defer
            };
            request.callback_id = callbackId;
            console.log('VACT: Sending request', request);
            ws.send(JSON.stringify(request));
            return defer.promise;
        };

        function listener(data) {
            var messageObj = data;
            console.log("VACT: Received data from websocket: ", messageObj);
            // If an object exists with callback_id in our callbacks object, resolve it
            if (callbacks.hasOwnProperty(messageObj.callback_id)) {
                console.log(callbacks[messageObj.callback_id]);
                $rootScope.$apply(callbacks[messageObj.callback_id].cb.resolve(messageObj.data));
                delete callbacks[messageObj.callbackID];
            }
        }

        // This creates a new callback ID for a request
        function getCallbackId() {
            currentCallbackId += 1;
            if (currentCallbackId > 10000) {
                currentCallbackId = 0;
            }
            return currentCallbackId;
        }

        // Define a "getter" for getting room equipment data
        VactModel.getEquipment = function () {
            var request = {
                type: "get_equipment"
            };
            // Storing in a variable for clarity on what sendRequest returns
            var promise = this.sendRequest(request);
            return promise;
        };

        return VactModel;
    }])
;
