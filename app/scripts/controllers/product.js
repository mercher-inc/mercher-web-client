'use strict';

angular.module('mercherWebClientApp')
    .controller('ProductCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.back = function(){
            console.log(1);
        };
    });
