'use strict';

angular.module('mercherWebClientApp')
    .directive('mcPage', function ($window) {
        return {
            restrict: 'C',
            link: function(scope, element) {
                var window = angular.element($window);
                var updateHeight = function(){
                    element.css({
                        height: window.innerHeight()
                    });
                };
                updateHeight();
                window.bind('resize', updateHeight);
            },
            controller: function($scope){

            }
        };
    });
