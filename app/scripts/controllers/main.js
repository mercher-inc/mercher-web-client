'use strict';

/**
 * @ngdoc function
 * @name mercherWebClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mercherWebClientApp
 */
angular.module('mercherWebClientApp')
    .controller('MainCtrl', function ($scope, facebook) {
        $scope.login = function () {
            facebook
                .getLoginStatus()
                .then(function(status){
                    if (status !== 'connected') {
                        facebook.login();
                    }
                });
        };

        $scope.$on('fb.auth.authResponseChange', function(e, authResponse){
            if (authResponse.status === 'connected') {
                console.log(authResponse.authResponse.accessToken);
            }
        });
    });
