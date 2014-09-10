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
            .state('marketing', {
                url:         '/',
                templateUrl: 'views/marketing.html',
                controller:  'MarketingCtrl'
            })
            .state('marketplace', {
                url:         '/market',
                templateUrl: 'views/marketplace.html',
                controller:  'MarketplaceCtrl'
            });
        facebookProvider.configure(facebookConfig);
    })
    .run(function ($rootScope, $log, AuthService, socket, facebook) {

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

        $rootScope.$on('fb.auth.authResponseChange', function (e, r) {
            if (r.status === 'connected') {
                AuthService.loginThroughFacebook(r.authResponse.accessToken);
            }
        });

        facebook.init();
    });
