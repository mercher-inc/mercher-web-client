'use strict';

angular.module('mercherWebClientApp')
    .directive('mcBlock', function () {
        return {
            require:  '^mcPage',
            restrict: 'C',
            link:     function (scope, element) {
                element.bind('wheel', function (e) {
                    e.preventDefault();
                    if (e.originalEvent['deltaY'] < 0 && element.scrollTop() > 0) {
                        e.stopPropagation();
                        element.scrollTop(element.scrollTop() + e.originalEvent['deltaY']);
                    } else if (e.originalEvent['deltaY'] > 0 && element.scrollTop() + element.outerHeight() < this.scrollHeight) {
                        e.stopPropagation();
                        element.scrollTop(element.scrollTop() + e.originalEvent['deltaY']);
                    }
                });
            }
        };
    });
