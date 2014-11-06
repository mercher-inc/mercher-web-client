'use strict';

angular.module('mercherWebClientApp')
    .directive('mcMenu', function () {
        return {
            restrict:          'C',
            templateNamespace: 'svg',
            templateUrl:       '/views/directives/mcmenu.html'
        };
    });
