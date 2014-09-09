'use strict';

angular.module('mercherWebClientApp')
    .factory('Auth', ['$resource', function ($resource) {
        return $resource(
            '/api/v1/auth',
            null,
            {
                'signUp': {
                    method:       'POST',
                    url:          '/api/v1/auth/sign_up',
                    responseType: 'json'
                },
                'basic': {
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
    }]);