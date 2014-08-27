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
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch',
        'mc.module.facebook'
    ])
    .config(['facebookProvider', function (facebookProvider) {
        facebookProvider.configure({appId: '721263977929363'});
    }])
    .config(function ($locationProvider, $urlRouterProvider, $stateProvider) {
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
    })
    .run(function ($rootScope, socket, facebook) {
        socket.emit('app_started', {});

        facebook.init();

        $rootScope.$on('fb.auth.statusChange', function (event, authResponse) {
            console.log(authResponse);
            if (authResponse.status === 'connected') {
                facebook
                    .api('me')
                    .then(
                    function (response) {
                        console.log(response);
                    },
                    function (error) {
                        window.alert(error.message);
                    });
            } else {
                facebook
                    .login({
                        'scope': 'public_profile,email'
                    })
                    .then(function (response) {
                        console.log(response);
                    }, function (error) {
                        console.log(error);
                    });
            }
        });
    });
