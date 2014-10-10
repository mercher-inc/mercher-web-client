'use strict';

angular.module('mercherWebClientApp')
    .factory('Auth', ['$resource', function ($resource) {
        return $resource(
            '/api/v1/auth',
            null,
            {
                'signUp':   {
                    method:       'POST',
                    url:          '/api/v1/auth/sign_up',
                    responseType: 'json'
                },
                'basic':    {
                    method:       'POST',
                    url:          '/api/v1/auth/basic',
                    responseType: 'json'
                },
                'facebook': {
                    method:       'POST',
                    url:          '/api/v1/auth/facebook',
                    responseType: 'json'
                }
            }
        );
    }])
    .factory('User', ['$resource', function ($resource) {
        return $resource(
            '/api/v1/users',
            null,
            {
                'query': {
                    method:       'GET',
                    responseType: 'json'
                },
                'get':   {
                    method:       'GET',
                    url:          '/api/v1/users/:userId',
                    params:       {userId: '@userId'},
                    responseType: 'json'
                },
                'save':  {
                    method:       'PUT',
                    url:          '/api/v1/users/:userId',
                    params:       {userId: '@userId'},
                    responseType: 'json'
                }
            }
        );
    }])
    .factory('Categories', ['$resource', function ($resource) {
        return $resource(
            '/api/v1/categories',
            null,
            {
                'query': {
                    method:       'GET',
                    responseType: 'json'
                },
                'get':   {
                    method:       'GET',
                    url:          '/api/v1/categories/:categoryId',
                    params:       {categoryId: '@categoryId'},
                    responseType: 'json'
                },
                'save':  {
                    method:       'PUT',
                    url:          '/api/v1/categories/:categoryId',
                    params:       {categoryId: '@categoryId'},
                    responseType: 'json'
                }
            }
        );
    }])
    .factory('Products', ['$resource', function ($resource) {
        return $resource(
            '/api/v1/products',
            null,
            {
                'query':            {
                    method:       'GET',
                    responseType: 'json'
                },
                'queryForCategory': {
                    method:       'GET',
                    url:          '/api/v1/categories/:categoryId/products',
                    params:       {categoryId: '@categoryId'},
                    responseType: 'json'
                },
                'get':              {
                    method:       'GET',
                    url:          '/api/v1/products/:productId',
                    params:       {productId: '@productId'},
                    responseType: 'json'
                },
                'save':             {
                    method:       'PUT',
                    url:          '/api/v1/products/:productId',
                    params:       {productId: '@productId'},
                    responseType: 'json'
                }
            }
        );
    }]).factory('ProductImages', ['$resource', function ($resource) {
        return $resource(
            '/api/v1/product_images',
            null,
            {
                'queryForProduct': {
                    method:       'GET',
                    url:          '/api/v1/products/:productId/product_images',
                    params:       {productId: '@productId'},
                    responseType: 'json'
                },
                'get':             {
                    method:       'GET',
                    url:          '/api/v1/product_images/:productImageId',
                    params:       {productImageId: '@productImageId'},
                    responseType: 'json'
                },
                'save':            {
                    method:       'PUT',
                    url:          '/api/v1/product_images/:productImageId',
                    params:       {productImageId: '@productImageId'},
                    responseType: 'json'
                }
            }
        );
    }]);