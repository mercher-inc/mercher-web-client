'use strict';

angular.module('mercherWebClientApp')
    .controller('ProductReviewsCtrl', function ($scope, $stateParams, ProductReviews) {
        $scope.productReviews = [];
        ProductReviews.queryForProduct({productId: $stateParams['productId']})
            .$promise.then(function (productReviews) {
                $scope.productReviews = productReviews['productReviews'];
            });
    });

