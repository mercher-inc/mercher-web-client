'use strict';

angular.module('mercherWebClientApp')
    .directive('mcPage', function () {
        return {
            restrict:   'C',
            controller: function ($scope) {
                $scope.mainColor = '#3DA3A7';
            }
        };
    });
