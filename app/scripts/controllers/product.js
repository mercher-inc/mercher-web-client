'use strict';

angular.module('mercherWebClientApp')
    .controller('ProductCtrl', function ($scope, $stateParams, ProductResource, ProductImageResource) {
        $scope.product = null;
        $scope.productImages = [];

        ProductResource.get({productId: $stateParams.productId})
            .$promise.then(function (product) {
                $scope.product = product;

                ProductImageResource.get({productId: $stateParams.productId})
                    .$promise.then(function (productImages) {
                        $scope.productImages = productImages.productImages;
                        if (productImages.productImages.length) {
                            window.less.modifyVars({
                                '@mainColor': productImages.productImages[0].image.mainColor,
                                '@colorSchema': productImages.productImages[0].image.colorSchema
                            });
                        }
                    });
            });
    });

