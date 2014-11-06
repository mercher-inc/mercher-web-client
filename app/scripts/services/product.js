'use strict';

angular.module('mercherWebClientApp')
    .factory('ProductResource', function ($resource, pathConfig) {
        return $resource(
                pathConfig.api + 'products',
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
                    url:    pathConfig.api + 'products/:productId',
                    params: {
                        productId: '@productId'
                    }
                },
                update:          {
                    method: 'PUT',
                    url:    pathConfig.api + 'products/:productId',
                    params: {
                        productId: '@productId'
                    }
                },
                listForCategory: {
                    method: 'GET',
                    url:    pathConfig.api + 'categories/:categoryId/products',
                    params: {
                        categoryId: '@categoryId',
                        limit:      '@limit',
                        offset:     '@offset'
                    }
                },
                listForShop:     {
                    method: 'GET',
                    url:    pathConfig.api + 'shops/:shopId/products',
                    params: {
                        shopId: '@shopId',
                        limit:  '@limit',
                        offset: '@offset'
                    }
                }
            }
        );
    });