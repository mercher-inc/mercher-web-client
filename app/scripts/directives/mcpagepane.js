'use strict';

angular.module('mercherWebClientApp')
    .directive('mcPagePane', function () {
        return {
            require:    '^mcPageTabs',
            restrict:   'E',
            transclude: true,
            scope:      {
                tabImage: '=image',
                tabTitle: '=title',
                tabCover: '=cover'
            },
            templateUrl: '/views/templates/mcpagepane.html',
            controller: function () {
            },
            link:       function postLink(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
                console.log(scope.image, scope.title);
            }
        };
    });
