'use strict';

angular.module('mercherWebClientApp')
    .directive('mcImage', function ($window) {
        return {
            restrict: 'A',
            scope:    {
                image: '=mcImage',
                size:  '@size'
            },
            link:     function postLink(scope, element) {
                scope.size = scope.size || 'm';
                var devicePixelRatio = $window.devicePixelRatio || 1;
                var devicePixelRatioName = 'mdpi';

                if (devicePixelRatio > 1) {
                    devicePixelRatioName = 'hdpi';
                }
                if (devicePixelRatio > 1.5) {
                    devicePixelRatioName = 'xhdpi';
                }
                if (devicePixelRatio > 2) {
                    devicePixelRatioName = 'xxhdpi';
                }
                if (devicePixelRatio > 3) {
                    devicePixelRatioName = 'xxxhdpi';
                }

                console.log(devicePixelRatio);
                element.attr('src', '/uploads/' + scope.image.key + '/' + scope.image.files[scope.size][devicePixelRatioName].file);
            }
        };
    });
