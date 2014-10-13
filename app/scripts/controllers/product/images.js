'use strict';

angular.module('mercherWebClientApp')
    .controller('ProductImagesCtrl', function ($scope, $stateParams, ProductResource, ProductImageResource) {
        $scope.productImages = [];
        $scope.activeImage = null;

        $scope.selectImage = function(image){
            $scope.activeImage = image;
        };

        ProductImageResource.get({productId: $stateParams.productId})
            .$promise.then(function (productImages) {
                $scope.productImages = productImages.productImages;
                if (productImages.productImages.length) {
                    $scope.selectImage($scope.productImages[0].image);
                    window.less.modifyVars({
                        '@mainColor': productImages.productImages[0].image.mainColor,
                        '@colorSchema': productImages.productImages[0].image.colorSchema
                    });
                }
            });
    });
