'use strict';

angular.module('mercherWebClientApp')
    .directive('mcPage', function () {
        return {
            restrict: 'E',
            templateUrl: '/views/templates/mcpage.html',
            transclude: true,
            controller: function() {}
        };
    });
