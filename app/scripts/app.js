'use strict';

/**
 * @ngdoc overview
 * @name mercherWebClientApp
 * @description
 * # mercherWebClientApp
 *
 * Main module of the application.
 */
angular
    .module('mercherWebClientApp', [
        'config',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch',
        'mc.module.facebook'
    ])
    .config(function ($locationProvider, $urlRouterProvider, $stateProvider, facebookProvider, facebookConfig) {
        $locationProvider
            .html5Mode(true)
            .hashPrefix('!');
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url:         '/',
                templateUrl: 'views/main.html',
                controller:  'MainCtrl'
            })
            .state('about', {
                url:         '/about',
                templateUrl: 'views/about.html',
                controller:  'AboutCtrl'
            });
        facebookProvider.configure(facebookConfig);
    })
    .run(function ($rootScope, $log, socket, facebook) {
        socket.on('connect', function(){
            $log.info('Socket connection established');
        });
        socket.on('disconnect', function(){
            $log.info('Disconnected from socket');
        });
        socket.on('connect_error', function(){
            $log.error('An error occurred during connection to socket');
        });
        socket.on('connect_timeout', function(){
            $log.error('Socket connection timeout');
        });
        socket.on('reconnect', function(attempt){
            $log.info('Reconnected to socket on the %d attempt', attempt);
        });
        socket.on('reconnect_attempt', function(){
            $log.info('Trying to reconnect to socket');
        });
        socket.on('reconnecting', function(attempt){
            $log.info('%d attempt to connect to the socket', attempt);
        });
        socket.on('reconnect_error', function(){
            $log.error('An error occurred during reconnection to socket');
        });
        socket.on('reconnect_failed', function(){
            $log.error('Failed to reconnect to socket');
        });

        socket.emit('app_started', {});

        socket.on('user updated', function(data){
            $log.debug('user updated', data);
        });
        socket.on('shop updated', function(data){
            $log.debug('shop updated', data);
        });
        socket.on('product updated', function(data){
            $log.debug('product updated', data);
        });
        socket.on('image crop progress changed', function(data){
            $log.debug('image crop progress changed', data);
        });

        facebook.init();
    });
