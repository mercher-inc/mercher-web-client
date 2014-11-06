'use strict';

/**
 * @ngdoc service
 * @name mercherWebClientApp.socket
 * @description
 * # socket
 * Factory in the mercherWebClientApp.
 */
angular.module('mercherWebClientApp')
    .factory('socket', function ($rootScope, $log, pathConfig) {
        var socket = window.io.connect(pathConfig.socket);

        socket.on('connect', function () {
            $log.info('Socket connection established');
        });
        socket.on('disconnect', function () {
            $log.info('Disconnected from socket');
        });
        socket.on('connect_error', function () {
            $log.error('An error occurred during connection to socket');
        });
        socket.on('connect_timeout', function () {
            $log.error('Socket connection timeout');
        });
        socket.on('reconnect', function (attempt) {
            $log.info('Reconnected to socket on the %d attempt', attempt);
        });
        socket.on('reconnect_attempt', function () {
            $log.info('Trying to reconnect to socket');
        });
        socket.on('reconnecting', function (attempt) {
            $log.info('%d attempt to connect to the socket', attempt);
        });
        socket.on('reconnect_error', function () {
            $log.error('An error occurred during reconnection to socket');
        });
        socket.on('reconnect_failed', function () {
            $log.error('Failed to reconnect to socket');
        });

        return {
            on:   function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    });