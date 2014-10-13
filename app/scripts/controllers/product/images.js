'use strict';

angular.module('mercherWebClientApp')
    .controller('ProductImagesCtrl', function ($scope, $stateParams, ProductResource, ProductImageResource) {
        $scope.productImages = [];
        $scope.activeImage = null;

        $scope.selectImage = function (image) {
            $scope.activeImage = image;
            $scope.$parent.mainColor = $scope.activeImage.mainColor;
            window.less.modifyVars({
                '@mainColor':   $scope.activeImage.mainColor,
                '@colorSchema': $scope.activeImage.colorSchema
            });
        };

        ProductImageResource.get({productId: $stateParams.productId})
            .$promise.then(function (productImages) {
                $scope.productImages = productImages.productImages;
                if (productImages.productImages.length) {
                    $scope.selectImage($scope.productImages[0].image);
                }
            });
    });

