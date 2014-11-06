'use strict';

angular.module('mercherWebClientApp')
    .directive('mcBack', function (pathConfig) {
        return {
            restrict:          'C',
            scope:             {
                color: '=color'
            },
            templateNamespace: 'svg',
            templateUrl:       pathConfig.views + 'directives/mcback.html'
        };
    });
