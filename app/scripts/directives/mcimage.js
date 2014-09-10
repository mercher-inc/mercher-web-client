'use strict';

angular.module('mercherWebClientApp')
    .directive('mcImage', function () {
        return {
            restrict: 'A',
            scope:    {
                image: '=image',
                size:  '@size'
            },
            link:     function postLink(scope, element, attr) {
                element.attr('src', '/uploads/' + scope.image.key + '/' + scope.image.files[scope.size].mdpi.file);
            }
        };
    });
