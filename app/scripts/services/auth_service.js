'use strict';

angular.module('mercherWebClientApp')
    .factory('AuthService', ['$rootScope', '$http', 'Auth', 'User', function ($rootScope, $http, Auth, User) {
        return {
            loginThroughFacebook: function(fbAccessToken){
                Auth.facebook({fbAccessToken: fbAccessToken})
                    .$promise
                    .then(function (authResponse) {
                        $http.defaults.headers.common['X-Access-Token'] = authResponse.token;
                        User.get({userId: 'me'})
                            .$promise
                            .then(function (user) {
                                $rootScope.currentUser = user;
                                $rootScope.$broadcast('auth.login', user);
                            });
                    });
            }
        };
    }]);