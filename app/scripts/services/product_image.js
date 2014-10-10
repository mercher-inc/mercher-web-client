'use strict';

angular.module('mercherWebClientApp')
    .factory('ProductImageResource', function ($resource) {
        return $resource('/api/v1/products/:productId/product_images', {productId: '@productId'});
    }
);