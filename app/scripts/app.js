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
    .config(function ($locationProvider, $urlRouterProvider, $stateProvider, facebookProvider) {
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
        facebookProvider.configure({appId: '721263977929363'});
    })
    .run(function ($rootScope, socket, facebook) {
        socket.emit('app_started', {});

        facebook
            .getLoginStatus()
            .then(function (status) {
                console.log(status);
                if (status !== 'connected') {
                    facebook
                        .login({
                            'scope': 'public_profile,email'
                        });
                }
            });

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
            }
        });
    });
