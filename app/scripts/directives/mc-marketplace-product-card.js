'use strict';

angular.module('mercherWebClientApp')
    .directive('mcMarketplaceProductCard', function ($window) {
        return {
            restrict: 'C',
            link:     function (scope, element) {

                var resizeImages = function(){
                    element.css({
                        width: element.height() + element.find('> .description').width() + 15
                    });
                    element.find('> .description').css({
                        "margin-left" : element.height() + 15
                    });
                    element.find('> .images').css({
                        height: element.height(),
                        width: element.height()
                    });
                };

                resizeImages();

                angular.element($window).bind('resize', function () {
                    resizeImages();
                });
            }
        };
    });
