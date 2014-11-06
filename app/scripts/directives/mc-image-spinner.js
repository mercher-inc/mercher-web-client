'use strict';

angular.module('mercherWebClientApp')
    .directive('mcImageSpinner', function ($window, pathConfig) {
        return {
            restrict: 'C',
            link:     function (scope, element) {

                var flip = function () {
                    angular.element(element.find('> img')[scope.currentIndex]).removeClass('current');
                    angular.element(element.find('> img')[scope.currentIndex]).addClass('prev');
                    angular.element(element.find('> img')[scope.nextIndex]).removeClass('next');
                    angular.element(element.find('> img')[scope.nextIndex]).addClass('current');

                    setTimeout(function () {
                        angular.element(element.find('> img')[scope.currentIndex]).removeClass('prev');
                        scope.currentIndex = scope.nextIndex;
                        scope.nextIndex = (scope.currentIndex + 1) % scope.imagesCount;
                        angular.element(element.find('> img')[scope.nextIndex]).addClass('next');
                        setTimeout(flip, 5000 + Math.random() * 2000);
                    }, 1000);
                };

                scope.$watch(
                    function () {
                        return element.find('> img').length
                    },
                    function (imagesCount) {
                        if (imagesCount > 1) {
                            scope.imagesCount = imagesCount;
                            scope.currentIndex = 0;
                            scope.nextIndex = (scope.currentIndex + 1) % scope.imagesCount;

                            angular.element(element.find('> img')[scope.currentIndex]).addClass('current');
                            angular.element(element.find('> img')[scope.nextIndex]).addClass('next');

                            setTimeout(flip, 5000 + Math.random() * 2000);
                        }
                    }
                );
            }
        };
    });
