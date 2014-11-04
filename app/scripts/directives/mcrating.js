'use strict';

angular.module('mercherWebClientApp')
    .directive('mcRating', function () {
        return {
            restrict: 'C',
            scope:    {
                rating: '=rating'
            },
            templateNamespace: 'svg',
            templateUrl: '/views/directives/mcrating.html'
        };
    });
