'use strict';

angular.module('mercherWebClientApp')
    .directive('mcRadio', function (pathConfig) {
        return {
            restrict:          'C',
            scope:             {
                color: '=color'
            },
            templateNamespace: 'svg',
            templateUrl:       pathConfig.views + 'directives/mcradio.html'
        };
    });
