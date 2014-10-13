'use strict';

angular.module('mercherWebClientApp')
    .controller('ProductImagesCtrl', function ($scope, $stateParams, ProductResource, ProductImageResource) {
        console.log('ProductImagesCtrl');
        $scope.productImages = [];

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

