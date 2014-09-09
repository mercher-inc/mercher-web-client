'use strict';

angular.module('mc.module.facebook', [])
    .provider('facebook', function facebookProvider() {
        var provider = this,
            params = {
                appId:   null,
                status:  false,
                cookie:  false,
                version: 'v2.1'
            };

        this.sdk = null;

        this.configure = function (config) {
            angular.extend(params, config);
        };

        this.$get = ['$rootScope', '$log', '$q', '$window', function ($rootScope, $log, $q, $window) {

            var init = function () {
                var deferred = $q.defer();
                if (!provider.sdk) {
                    (function (d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {
                            return;
                        }
                        js = d.createElement(s);
                        js.id = id;
                        js.src = '//connect.facebook.net/en_US/sdk.js';
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                    $window.fbAsyncInit = function () {
                        if ($window.FB === undefined) {
                            deferred.reject();
                            return;
                        }
                        $window.FB.init(params);
                        var events = {
                            auth:    [
                                'authResponseChange',
                                'statusChange',
                                'login',
                                'logout'
                            ],
                            comment: [
                                'create',
                                'remove'
                            ],
                            edge:    [
                                'create',
                                'remove'
                            ],
                            message: [
                                'send'
                            ],
                            xfbml:   [
                                'render'
                            ]
                        };
                        angular.forEach(events.auth, function (event) {
                            $window.FB.Event.subscribe('auth.' + event, function (authResponse) {
                                $log.info('fb.auth.' + event);
                                $rootScope.$broadcast('fb.auth.' + event, authResponse);
                            });
                        });
                        angular.forEach(events.comment, function (event) {
                            $window.FB.Event.subscribe('comment.' + event, function (comment) {
                                $log.info('fb.comment.' + event);
                                $rootScope.$broadcast('fb.comment.' + event, comment);
                            });
                        });
                        angular.forEach(events.edge, function (event) {
                            $window.FB.Event.subscribe('edge.' + event, function (url, edge) {
                                $log.info('fb.edge.' + event);
                                $rootScope.$broadcast('fb.edge.' + event, url, edge);
                            });
                        });
                        angular.forEach(events.message, function (event) {
                            $window.FB.Event.subscribe('message.' + event, function (url) {
                                $log.info('fb.message.' + event);
                                $rootScope.$broadcast('fb.message.' + event, url);
                            });
                        });
                        angular.forEach(events.xfbml, function (event) {
                            $window.FB.Event.subscribe('xfbml.' + event, function () {
                                $log.info('fb.xfbml.' + event);
                                $rootScope.$broadcast('fb.xfbml.' + event);
                            });
                        });

                        $log.info('Facebook initialization done');
                        deferred.resolve(provider.sdk = $window.FB);
                    };
                } else {
                    deferred.resolve(provider.sdk);
                }
                return deferred.promise;
            };

            return  {
                init:           init,
                api:            function (path, method, params) {
                    var deferred = $q.defer();
                    init().then(function (FB) {
                        FB.api(path, method || 'get', params || {}, function (response) {
                            if (!response || response.error) {
                                deferred.reject(response.error);
                            } else {
                                deferred.resolve(response);
                            }
                        });
                    });
                    return deferred.promise;
                },
                ui:             function (params) {
                    var deferred = $q.defer();
                    init().then(function (FB) {
                        FB.ui(params || {}, function (response) {
                            if (!response || response.error) {
                                deferred.reject(response);
                            } else {
                                deferred.resolve(response);
                            }
                        });
                    });
                    return deferred.promise;
                },
                getLoginStatus: function () {
                    var deferred = $q.defer();
                    init().then(function (FB) {
                        FB.getLoginStatus(function (response) {
                            if (!response || response.error) {
                                deferred.reject(response);
                            } else {
                                deferred.resolve(response.status);
                            }
                        });
                    });
                    return deferred.promise;
                },
                login:          function (options) {
                    var deferred = $q.defer();
                    init().then(function (FB) {
                        FB.login(function (response) {
                            if (response.authResponse) {
                                deferred.resolve(response);
                            } else {
                                deferred.reject(response);
                            }
                        }, options);
                    });
                    return deferred.promise;
                },
                logout:         function () {
                    var deferred = $q.defer();
                    init().then(function (FB) {
                        FB.logout(function (response) {
                            deferred.resolve(response);
                        });
                    });
                    return deferred.promise;
                },
                getAccessToken: function () {
                    var deferred = $q.defer();
                    init().then(function (FB) {
                        deferred.resolve(FB.getAccessToken());
                    });
                    return deferred.promise;
                },
                getUserID:      function () {
                    var deferred = $q.defer();
                    init().then(function (FB) {
                        deferred.resolve(FB.getUserID());
                    });
                    return deferred.promise;
                }
            };
        }];
    });