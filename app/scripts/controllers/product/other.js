'use strict';

angular.module('mercherWebClientApp')
    .controller('ProductOtherCtrl', function ($scope, $stateParams, ProductResource) {
        $scope.shop = null;
        $scope.products = [];
        $scope.$watch(
            function ($scope) {
                return $scope.product && $scope.product.shop ? $scope.product.shop : null;
            },
            function (shop) {
                $scope.shop = shop;
                $scope.products = [];

                if (shop) {
                    ProductResource.listForShop({shopId: $scope.shop.id})
                        .$promise.then(function (products) {
                            $scope.products = products.products;
                        });
                }

            }
        );
    });

