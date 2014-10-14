'use strict';

angular.module('mercherWebClientApp')
    .directive('mcCustomColor', function () {
        return {
            restrict: 'A',
            scope:    {
                attributes: '=mcCustomColor'
            },
            link:     function (scope, element) {
                scope.$watch('attributes', function (newAttributes) {
                    element.css(newAttributes);
                    var transitionRule = Object.keys(newAttributes).map(function (attr) {
                        return attr + ' .5s'
                    }).join(', ');
                    element.css({
                        '-webkit-transition': transitionRule,
                        '-o-transition':      transitionRule,
                        'transition':         transitionRule
                    });
                });
            }
        };
    });
