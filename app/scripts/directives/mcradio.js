'use strict';

angular.module('mercherWebClientApp')
    .directive('mcRadio', function () {
        return {
            restrict: 'C',
            templateNamespace: 'svg',
            templateUrl: '/views/directives/mcradio.html'
        };
    });
