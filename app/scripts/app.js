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
    .config(function ($locationProvider, $urlRouterProvider, $stateProvider, facebookProvider, facebookConfig, pathConfig, appConfig) {
        $locationProvider
            .html5Mode(appConfig.html5Mode)
            .hashPrefix('!');
        $urlRouterProvider.otherwise('/');
        $stateProvider

            ///////////////
            // Marketing //
            ///////////////

            .state('marketing', {
                url:         '/',
                templateUrl: pathConfig.views + 'marketing.html',
                controller:  'MarketingCtrl'
            })

            /////////////////
            // Marketplace //
            /////////////////

            .state('marketplace', {
                abstract:    true,
                url:         '/marketplace',
                templateUrl: pathConfig.views + 'marketplace.html',
                controller:  'MarketplaceCtrl'
            })

            .state('marketplace.top', {
                url:         '',
                templateUrl: pathConfig.views + 'marketplace/top.html',
                controller:  'MarketplaceTopCtrl'
            })

            .state('marketplace.category', {
                url:         '/categories/:categoryId',
                templateUrl: pathConfig.views + 'marketplace/category.html',
                controller:  'MarketplaceCategoryCtrl'
            })

            //////////
            // Shop //
            //////////

            .state('shop', {
                url: '/shops/:shopId'
            })

            /////////////
            // Product //
            /////////////

            .state('product', {
                url:   '/products/:productId',
                views: {
                    '':                {
                        templateUrl: pathConfig.views + 'product.html',
                        controller:  'ProductCtrl'
                    },
                    'details@product': {
                        templateUrl: pathConfig.views + 'product/details.html',
                        controller:  'ProductDetailsCtrl'
                    },
                    'reviews@product': {
                        templateUrl: pathConfig.views + 'product/reviews.html',
                        controller:  'ProductReviewsCtrl'
                    },
                    'other@product':   {
                        templateUrl: pathConfig.views + 'product/other.html',
                        controller:  'ProductOtherCtrl'
                    }
                }
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
