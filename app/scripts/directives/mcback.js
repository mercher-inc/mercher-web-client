'use strict';

angular.module('mercherWebClientApp')
    .directive('mcBack', function () {
        return {
            restrict:          'C',
            scope:             {
                color: '=color'
            },
            templateNamespace: 'svg',
            templateUrl:       '/views/directives/mcback.html'
        };
    });
