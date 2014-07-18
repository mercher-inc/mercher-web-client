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
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
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
  });
