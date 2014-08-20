'use strict';

/**
 * @ngdoc service
 * @name mercherWebClientApp.socket
 * @description
 * # socket
 * Factory in the mercherWebClientApp.
 */
angular.module('mercherWebClientApp')
    .factory('socket', function ($rootScope) {
        var socket = window.io.connect('http://localhost:3000');
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
                })
            }
        };
    });