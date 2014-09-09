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
    .run(function ($rootScope, $http, $log, Auth, User, socket, facebook) {

        socket.on('user updated', function (data) {
            $log.debug('user updated', data);
        });
        socket.on('shop updated', function (data) {
            $log.debug('shop updated', data);
        });
        socket.on('product updated', function (data) {
            $log.debug('product updated', data);
        });
        socket.on('image crop progress changed', function (data) {
            $log.debug('image crop progress changed', data);
        });

        $rootScope.$on('fb.auth.authResponseChange', function (e, authResponse) {
            if (authResponse.status === 'connected') {
                console.log(authResponse.authResponse.accessToken);
                Auth.facebook({access_token: authResponse.authResponse.accessToken})
                    .$promise
                    .then(function (authResponse) {
                        $http.defaults.headers.common['X-Access-Token'] = authResponse.token;
                        User.get({userId: 'me'})
                            .$promise
                            .then(function (user) {
                                window.alert('Hello, ' + user.first_name);
                                $rootScope.currentUser = user;
                            });
                    });
            }
        });

        facebook.init();
    });
