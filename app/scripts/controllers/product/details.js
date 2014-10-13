'use strict';

angular.module('mercherWebClientApp')
    .controller('ProductDetailsCtrl', function ($scope, $stateParams, ProductResource) {
        $scope.product = null;
        ProductResource.get({productId: $stateParams.productId})
            .$promise.then(function (product) {
                $scope.product = product;
            });
    });
