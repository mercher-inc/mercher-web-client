'use strict';

angular.module('mercherWebClientApp')
    .controller('ProductReviewsCtrl', function ($scope, $stateParams, ProductReviews) {
        $scope.productReviews = [];
        ProductReviews.queryForProduct({productId: $stateParams['productId']})
            .$promise.then(function (productReviews) {
                console.log(productReviews);
                $scope.productReviews = productReviews['productReviews'];
            });
    });

