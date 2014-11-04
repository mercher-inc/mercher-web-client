'use strict';

angular.module('mercherWebClientApp')
    .directive('mcColorize', function () {
        return {
            restrict:   'C',
            controller: function ($scope, $element) {
                $scope.classes = {};
                $scope.$on('colorize', function (e, mainColor, colorSchema) {
                    var colorizeClass = 'colorize_' + mainColor.replace('#', '') + '_' + colorSchema;
                    if (!$scope.classes[colorizeClass]) {
                        less
                            .render('.' + colorizeClass + '{@import "/styles/colorize";}', {modifyVars: {mainColor: mainColor, colorSchema: colorSchema}})
                            .then(function (result) {
                                $scope.classes[colorizeClass] = result.css;
                                $element.append(result.css);
                            });
                    }
                })
            }
        };
    });