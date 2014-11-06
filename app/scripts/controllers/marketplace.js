'use strict';

angular.module('mercherWebClientApp')
    .controller('MarketplaceCtrl', function ($scope, Categories) {
        $scope.categories = [];

        Categories
            .query({limit: 10})
            .$promise
            .then(function (categories) {
                $scope.categories = categories.categories;
            });
    });
