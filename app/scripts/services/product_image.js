'use strict';

angular.module('mercherWebClientApp')
    .factory('ProductImageResource', function ($resource, pathConfig) {
        return $resource(pathConfig.api + 'products/:productId/product_images', {productId: '@productId'});
    }
);