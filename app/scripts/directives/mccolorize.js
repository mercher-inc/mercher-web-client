'use strict';

angular.module('mercherWebClientApp')
    .directive('mcColorize', function (pathConfig, $http) {
        return {
            restrict:   'C',
            controller: function ($scope, $element) {
                var less = window.less;
                $scope.classes = {};
                $scope.$on('colorize', function (e, mainColor, colorSchema) {
                    var colorizeClass = 'colorize_' + mainColor.replace('#', '') + '_' + colorSchema;
                    if (!$scope.classes[colorizeClass]) {
                        $http.get(pathConfig.styles + 'colorize.less').success(function (data) {
                            less
                                .render('.' + colorizeClass + '{' + data + '}', {modifyVars: {mainColor: mainColor, colorSchema: colorSchema}})
                                .then(function (result) {
                                    $scope.classes[colorizeClass] = result.css;
                                    $element.append(result.css);
                                });
                        });
                    }
                });
            }
        };
    });
