'use strict';

angular.module('mercherWebClientApp')
    .controller('ProductImagesCtrl', function ($scope, $stateParams, ProductResource, ProductImageResource) {
        $scope.activeImage = null;

        $scope.$watch('product', function (product) {
            if (product && product.productImages.length) {
                $scope.selectImage(product.productImages[0].image);
            }
        });

        $scope.selectImage = function (image) {
            $scope.activeImage = image;
            $scope.$parent.$parent.mainColor = $scope.activeImage.mainColor;
        };
    });

