'use strict';

angular.module('mercherWebClientApp')
    .directive('mcRating', function (pathConfig) {
        return {
            restrict:          'C',
            scope:             {
                rating: '=rating'
            },
            templateNamespace: 'svg',
            templateUrl:       pathConfig.views + 'directives/mcrating.html'
        };
    });
