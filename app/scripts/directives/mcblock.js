'use strict';

angular.module('mercherWebClientApp')
    .directive('mcBlock', function ($window) {
        return {
            require:    '^mcPage',
            restrict:   'C',
            link:       function (scope, element) {
                var window = angular.element($window);
                var updateDimentions = function () {
                    element.css({
                        height: window.innerHeight()
                    });
                    if (element.hasClass('quadratic')) {
                        element.css({
                            width: window.innerHeight()
                        });
                    } else if (element.hasClass('rectangular')) {
                        element.css({
                            width: window.innerHeight() / 2
                        });
                    }
                };
                updateDimentions();
                window.bind('resize', updateDimentions);
            },
            controller: function () {
            }
        };
    });
