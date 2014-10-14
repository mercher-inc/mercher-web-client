'use strict';

angular.module('mercherWebClientApp')
    .directive('mcCustomBackground', function () {
        return {
            restrict: 'A',
            scope:    {
                color: '=mcCustomBackground'
            },
            link:     function (scope, element) {
                scope.$watch('color', function (newColor) {
                    element.css({
                        'background-color': newColor
                    });
                });
            }
        };
    });
