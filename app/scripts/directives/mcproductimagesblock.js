'use strict';

angular.module('mercherWebClientApp')
    .directive('mcProductImagesBlock', function () {
        return {
            require:     '^mcPage',
            scope:       {
                productImages: '=productImages'
            },
            templateUrl: '/views/directives/mcproductimagesblock.html',
            restrict:    'C',
            link:        function (scope, element) {
                element.bind('wheel', function (e) {
                    e.preventDefault();
                    var currentImageIndex = scope.productImages.indexOf(scope.currentProductImage);
                    if (e.originalEvent['deltaY'] > 0 && scope.productImages.length > currentImageIndex + 1) {
                        scope.selectProductImage(scope.productImages[currentImageIndex + 1]);
                    } else if (e.originalEvent['deltaY'] < 0 && currentImageIndex > 0) {
                        scope.selectProductImage(scope.productImages[currentImageIndex - 1]);
                    }
                });
                angular.element(window).bind('resize', function () {
                    scope.selectProductImage(scope.currentProductImage);
                });
                scope.$watch('productImages', function (newProductImages) {
                    if (newProductImages.length) {
                        scope.selectProductImage(newProductImages[0]);
                    }
                });
                scope.selectProductImage = function (productImage) {
                    var imagesElement = element.children('.images').first(),
                        switcherElement = element.children('.switcher').first(),
                        currentImageIndex = scope.productImages.indexOf(productImage);
                    imagesElement.css({
                        position:   'relative',
                        transition: 'top .5s',
                        top:        imagesElement.children('.image').height() * -1 * currentImageIndex
                    });
                    switcherElement.children('.mc-radio').removeClass('active');
                    if (switcherElement.children('.mc-radio')[currentImageIndex]) {
                        angular.element(switcherElement.children('.mc-radio')[currentImageIndex]).addClass('active');
                    }
                    scope.currentProductImage = productImage;
                }
            }
        };
    });
