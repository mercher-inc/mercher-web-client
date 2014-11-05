'use strict';

angular.module('mercherWebClientApp')
    .controller('MarketplaceCategoryCtrl', function ($scope, $stateParams, Categories, Products) {
        $scope.category = null;
        $scope.products = [];
        Categories
            .get({categoryId: $stateParams.categoryId})
            .$promise.then(function (category) {
                $scope.category = category;
            });
        Products
            .queryForCategory({categoryId: $stateParams.categoryId, limit: 100})
            .$promise.then(function (products) {
                $scope.products = products.products;
            });
    });
