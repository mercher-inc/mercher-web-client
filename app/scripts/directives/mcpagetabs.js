'use strict';

angular.module('mercherWebClientApp')
    .directive('mcPageTabs', function () {
        return {
            require:  '^mcPage',
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope) {
                var panes = $scope.panes = [];
                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                };
                this.addPane = function(pane) {
                    if (panes.length === 0) {
                        $scope.select(pane);
                    }
                    panes.push(pane);
                };
            },
            templateUrl: '/views/templates/mcpagetabs.html',
            link:     function postLink(scope, element) {
                element.css({
                    position: 'fixed',
                    top:      '0',
                    right:    '0',
                    bottom:   '0',
                    left:     '0'
                });
            }
        };
    });
