'use strict';

angular.module('mercherWebClientApp')
    .factory('ProductResource', function ($resource) {
        return $resource('/api/v1/products/:productId', {productId: '@productId'});
    }
);