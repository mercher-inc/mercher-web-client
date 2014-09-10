'use strict';

angular.module('mercherWebClientApp')
    .controller('MarketplaceCtrl', function ($scope, facebook, Categories, Products, ProductImages) {
        $scope.categories = [];

        Categories.query().$promise
            .then(function(response){
                $scope.categories = response.categories;
                angular.forEach($scope.categories, function(category) {
                    Products.queryForCategory({categoryId: category.id}).$promise
                        .then(function(response){
                            category.products = response.products;
                            angular.forEach(category.products, function(product) {
                                ProductImages.queryForProduct({productId: product.id}).$promise
                                    .then(function(response){
                                        product.productImages = response.productImages;
                                    });
                            });
                        });
                });
            });

        $scope.login = function () {
            facebook
                .getLoginStatus()
                .then(function(status){
                    if (status !== 'connected') {
                        facebook.login();
                    }
                });
        };
    });
