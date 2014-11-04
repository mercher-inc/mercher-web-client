'use strict';

angular.module('mercherWebClientApp')
    .directive('mcPage', function () {
        return {
            restrict:   'C',
            link:       function (scope, element) {
                element.bind('wheel', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    element.scrollLeft(element.scrollLeft() + e.originalEvent.deltaY);
                });
            },
            controller: function ($scope, $element) {
                $scope.colorizeClass = false;
                $scope.$on('colorize', function (e, mainColor, colorSchema) {
                    if ($scope.colorizeClass) {
                        $element.removeClass($scope.colorizeClass);
                    }
                    $scope.colorizeClass = 'colorize_' + mainColor.replace('#', '') + '_' + colorSchema;
                    $element.addClass($scope.colorizeClass);
                });


            }
        };
    });
