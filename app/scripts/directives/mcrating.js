'use strict';

angular.module('mercherWebClientApp')
    .directive('mcRating', function () {
        return {
            restrict: 'A',
            scope:    {
                rating: "=mcRating"
            },
            templateUrl: '/views/directives/mcrating.html'
        };
    });
