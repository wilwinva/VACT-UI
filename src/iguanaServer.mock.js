'use strict';
/**
 * @ngdoc overview
 * @project VACT
 * @name Iguana Server
 * @description
 * # Iguana Server
 *
 * Mock of the policy manager file on the iguana server
 * used for testing in development
 */
module.exports = function (request) {
    console.log('Loaded Iguana Server mock');
    var connection = request.accept(null, request.origin);

    console.log('client connected: ', request.origin);

    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            var object = JSON.parse(message.utf8Data);

            console.log('Policy Manager received:', object);

            if (object.event) {
                //room classification changed
                if (object.event === 'classification') {
                    console.log('Received classification change message room is operating as ' + object.status);
                }
                // Input device is assigned to an output device
                if (object.event === 'drop') {
                    console.log('routing switch should switch input ' + object.condition_1 + ' to output ' + object.condition_2);
                    var routingSwitchMsg = {event: 'switch', input: object.condition_1, output: object.condition_2};
                    setTimeout(function () {
                        connection.sendUTF(JSON.stringify(routingSwitchMsg));
                    }, 2000);
                }
            }


        }
    });

    connection.on('close', function (connection) {
        console.log('closed connection: ' + connection);
    });
};
