'use strict';

angular.module('mercherWebClientApp')
    .controller('MarketplaceTopCtrl', function ($scope, Products) {
        $scope.products = [];
        Products
            .query({limit: 100})
            .$promise.then(function (products) {
                $scope.products = products.products;
            });
    });
