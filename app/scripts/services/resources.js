'use strict';

angular.module('mercherWebClientApp')
    .factory('Auth', ['$resource', 'pathConfig', function ($resource, pathConfig) {
        return $resource(
                pathConfig.api + 'auth',
            null,
            {
                'signUp':   {
                    method:       'POST',
                    url:          pathConfig.api + 'auth/sign_up',
                    responseType: 'json'
                },
                'basic':    {
                    method:       'POST',
                    url:          pathConfig.api + 'auth/basic',
                    responseType: 'json'
                },
                'facebook': {
                    method:       'POST',
                    url:          pathConfig.api + 'auth/facebook',
                    responseType: 'json'
                }
            }
        );
    }])
    .factory('User', ['$resource', 'pathConfig', function ($resource, pathConfig) {
        return $resource(
                pathConfig.api + 'users',
            null,
            {
                'query': {
                    method:       'GET',
                    responseType: 'json'
                },
                'get':   {
                    method:       'GET',
                    url:          pathConfig.api + 'users/:userId',
                    params:       {userId: '@userId'},
                    responseType: 'json'
                },
                'save':  {
                    method:       'PUT',
                    url:          pathConfig.api + 'users/:userId',
                    params:       {userId: '@userId'},
                    responseType: 'json'
                }
            }
        );
    }])
    .factory('Categories', ['$resource', 'pathConfig', function ($resource, pathConfig) {
        return $resource(
                pathConfig.api + 'categories',
            null,
            {
                'query': {
                    method:       'GET',
                    responseType: 'json'
                },
                'get':   {
                    method:       'GET',
                    url:          pathConfig.api + 'categories/:categoryId',
                    params:       {categoryId: '@categoryId'},
                    responseType: 'json'
                },
                'save':  {
                    method:       'PUT',
                    url:          pathConfig.api + 'categories/:categoryId',
                    params:       {categoryId: '@categoryId'},
                    responseType: 'json'
                }
            }
        );
    }])
    .factory('Products', ['$resource', 'pathConfig', function ($resource, pathConfig) {
        return $resource(
                pathConfig.api + 'products',
            null,
            {
                'query':            {
                    method:       'GET',
                    responseType: 'json'
                },
                'queryForCategory': {
                    method:       'GET',
                    url:          pathConfig.api + 'categories/:categoryId/products',
                    params:       {categoryId: '@categoryId'},
                    responseType: 'json'
                },
                'get':              {
                    method:       'GET',
                    url:          pathConfig.api + 'products/:productId',
                    params:       {productId: '@productId'},
                    responseType: 'json'
                },
                'save':             {
                    method:       'PUT',
                    url:          pathConfig.api + 'products/:productId',
                    params:       {productId: '@productId'},
                    responseType: 'json'
                }
            }
        );
    }])
    .factory('ProductImages', ['$resource', 'pathConfig', function ($resource, pathConfig) {
        return $resource(
                pathConfig.api + 'product_images',
            null,
            {
                'queryForProduct': {
                    method:       'GET',
                    url:          pathConfig.api + 'products/:productId/product_images',
                    params:       {productId: '@productId'},
                    responseType: 'json'
                },
                'get':             {
                    method:       'GET',
                    url:          pathConfig.api + 'product_images/:productImageId',
                    params:       {productImageId: '@productImageId'},
                    responseType: 'json'
                },
                'save':            {
                    method:       'PUT',
                    url:          pathConfig.api + 'product_images/:productImageId',
                    params:       {productImageId: '@productImageId'},
                    responseType: 'json'
                }
            }
        );
    }])
    .factory('ProductReviews', ['$resource', 'pathConfig', function ($resource, pathConfig) {
        return $resource(
                pathConfig.api + 'product_reviews',
            null,
            {
                'queryForProduct': {
                    method:       'GET',
                    url:          pathConfig.api + 'products/:productId/product_reviews',
                    params:       {productId: '@productId'},
                    responseType: 'json'
                },
                'get':             {
                    method:       'GET',
                    url:          pathConfig.api + 'product_reviews/:productReviewId',
                    params:       {productReviewId: '@productReviewId'},
                    responseType: 'json'
                },
                'save':            {
                    method:       'PUT',
                    url:          pathConfig.api + 'product_reviews/:productReviewId',
                    params:       {productReviewId: '@productReviewId'},
                    responseType: 'json'
                }
            }
        );
    }]);