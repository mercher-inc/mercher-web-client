'use strict';

angular.module('mercherWebClientApp')
    .directive('mcMenu', function (pathConfig) {
        return {
            restrict:          'C',
            templateNamespace: 'svg',
            templateUrl:       pathConfig.views + 'directives/mcmenu.html'
        };
    });
