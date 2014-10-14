'use strict';

angular.module('mercherWebClientApp')
    .directive('mcCustomColor', function () {
        return {
            restrict: 'A',
            scope:    {
                color: '=mcCustomColor'
            },
            link:     function (scope, element) {
                scope.$watch('color', function (newColor) {
                    element.css({
                        'color':              newColor,
                        '-webkit-transition': 'color 0.5s',
                        '-o-transition':      'color 0.5s',
                        'transition':         'color 0.5s'
                    });
                });
            }
        };
    });
