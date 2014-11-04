'use strict';

angular.module('mercherWebClientApp')
    .directive('mcPage', function () {
        return {
            restrict:   'C',
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
