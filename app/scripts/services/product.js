'use strict';

angular.module('mercherWebClientApp')
    .factory('ProductResource', function ($resource) {
        return $resource(
            '/api/v1/products',
            {},
            {
                list:            {
                    method: 'GET',
                    params: {
                        limit:  '@limit',
                        offset: '@offset'
                    }
                },
                create:          {
                    method: 'POST'
                },
                get:             {
                    method: 'GET',
                    url:    '/api/v1/products/:productId',
                    params: {
                        productId: '@productId'
                    }
                },
                update:          {
                    method: 'PUT',
                    url:    '/api/v1/products/:productId',
                    params: {
                        productId: '@productId'
                    }
                },
                listForCategory: {
                    method: 'GET',
                    url:    '/api/v1/categories/:categoryId/products',
                    params: {
                        categoryId: '@categoryId',
                        limit:      '@limit',
                        offset:     '@offset'
                    }
                },
                listForShop:     {
                    method: 'GET',
                    url:    '/api/v1/shops/:shopId/products',
                    params: {
                        shopId: '@shopId',
                        limit:  '@limit',
                        offset: '@offset'
                    }
                }
            }
        );
    });