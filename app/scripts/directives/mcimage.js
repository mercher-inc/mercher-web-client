'use strict';

angular.module('mercherWebClientApp')
    .directive('mcImage', function ($window) {
        return {
            restrict: 'A',
            scope:    {
                image: '=mcImage',
                size:  '@size'
            },
            link:     function (scope, element) {
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

                scope.$watch('image', function (newImage) {
                    setImage(newImage, scope.size);
                });

                scope.$watch('size', function (newSize) {
                    setImage(scope.image, newSize);
                });

                function setImage(image, size) {
                    if (image.files && image.files[size] && image.files[size][devicePixelRatioName] && image.files[size][devicePixelRatioName].file) {
                        element.attr('src', '/uploads/' + image.key + '/' + image.files[size][devicePixelRatioName].file);
                    } else {
                        element.attr('src', '/images/default100.png');
                    }
                }
            }
        };
    });
