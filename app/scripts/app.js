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
    .run(function ($rootScope, socket, facebook) {
        socket.emit('app_started', {});
        console.log('app_started', {});

        socket.on('user updated', function(data){
            console.log('user updated', data);
        });
        socket.on('shop updated', function(data){
            console.log('shop updated', data);
        });
        socket.on('product updated', function(data){
            console.log('product updated', data);
        });

        facebook.init();
    });
