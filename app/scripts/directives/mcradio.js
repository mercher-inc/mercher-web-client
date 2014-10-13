'use strict';

angular.module('mercherWebClientApp')
    .directive('mcRadio', function () {
        return {
            restrict:          'C',
            scope:             {
                color: '=color'
            },
            templateNamespace: 'svg',
            templateUrl:       '/views/directives/mcradio.html'
        };
    });
