'use strict';

angular.module('mercherWebClientApp')
    .directive('mcLogo', function (pathConfig) {
        return {
            restrict:          'C',
            templateNamespace: 'svg',
            templateUrl:       pathConfig.views + 'directives/mclogo.html',
            link:              function (scope, element) {

                var Polygon = function () {
                    this.points = [];
                    this.printPoint = function () {
                        var p = [];
                        for (var i in this.points) {
                            p.push(this.points[i].x + ',' + this.points[i].y)
                        }
                        return p.join(' ');
                    };
                };

                var w = 5,
                    p = 1,
                    sz = 40,
                    sp = (60 - sz) / 2;

                scope.lines = {
                    vertical: {
                        left:   { A: -1, B: 0, C: sp },
                        right:  { A: -1, B: 0, C: 60 - sp },
                        left1:  { A: -1, B: 0, C: sp + w },
                        left2:  { A: -1, B: 0, C: sp + w + p },
                        left3:  { A: -1, B: 0, C: sp + w + p + w },
                        left4:  { A: -1, B: 0, C: sp + w + p + w + p },
                        center: { A: -1, B: 0, C: 60 / 2 }
                    }
                };
                var a = -(Math.PI / 180) * 60;
                scope.lines.horizontal = {
                    left1: { A: Math.cos(a), B: Math.sin(a), C: 0 },
                    left2: { A: Math.cos(a), B: Math.sin(a), C: w },
                    left3: { A: Math.cos(a), B: Math.sin(a), C: w + p },
                    left4: { A: Math.cos(a), B: Math.sin(a), C: w + p + w }
                };

                scope.polygons = {
                    leftTop:     new Polygon(),
                    leftBottom:  new Polygon(),
                    rightTop:    new Polygon(),
                    rightBottom: new Polygon(),
                    bigTop:      new Polygon(),
                    bigBottom:   new Polygon()
                };

                scope.polygons.leftTop.points[0] = {
                    x: (scope.lines.horizontal.left1.B * scope.lines.vertical.left.C - scope.lines.horizontal.left1.C * scope.lines.vertical.left.B) / (scope.lines.horizontal.left1.A * scope.lines.vertical.left.B - scope.lines.horizontal.left1.B * scope.lines.vertical.left.A),
                    y: (scope.lines.horizontal.left1.C * scope.lines.vertical.left.A - scope.lines.horizontal.left1.A * scope.lines.vertical.left.C) / (scope.lines.horizontal.left1.A * scope.lines.vertical.left.B - scope.lines.horizontal.left1.B * scope.lines.vertical.left.A)
                };

                scope.polygons.leftTop.points[1] = {
                    x: (scope.lines.horizontal.left1.B * scope.lines.vertical.left1.C - scope.lines.horizontal.left1.C * scope.lines.vertical.left1.B) / (scope.lines.horizontal.left1.A * scope.lines.vertical.left1.B - scope.lines.horizontal.left1.B * scope.lines.vertical.left1.A),
                    y: (scope.lines.horizontal.left1.C * scope.lines.vertical.left1.A - scope.lines.horizontal.left1.A * scope.lines.vertical.left1.C) / (scope.lines.horizontal.left1.A * scope.lines.vertical.left1.B - scope.lines.horizontal.left1.B * scope.lines.vertical.left1.A)
                };

                scope.polygons.leftTop.points[2] = {
                    x: (scope.lines.horizontal.left2.B * scope.lines.vertical.left1.C - scope.lines.horizontal.left2.C * scope.lines.vertical.left1.B) / (scope.lines.horizontal.left2.A * scope.lines.vertical.left1.B - scope.lines.horizontal.left2.B * scope.lines.vertical.left1.A),
                    y: (scope.lines.horizontal.left2.C * scope.lines.vertical.left1.A - scope.lines.horizontal.left2.A * scope.lines.vertical.left1.C) / (scope.lines.horizontal.left2.A * scope.lines.vertical.left1.B - scope.lines.horizontal.left2.B * scope.lines.vertical.left1.A)
                };

                scope.polygons.leftTop.points[3] = {
                    x: (scope.lines.horizontal.left2.B * scope.lines.vertical.left.C - scope.lines.horizontal.left2.C * scope.lines.vertical.left.B) / (scope.lines.horizontal.left2.A * scope.lines.vertical.left.B - scope.lines.horizontal.left2.B * scope.lines.vertical.left.A),
                    y: (scope.lines.horizontal.left2.C * scope.lines.vertical.left.A - scope.lines.horizontal.left2.A * scope.lines.vertical.left.C) / (scope.lines.horizontal.left2.A * scope.lines.vertical.left.B - scope.lines.horizontal.left2.B * scope.lines.vertical.left.A)
                };

                scope.polygons.leftBottom.points[0] = {
                    x: (scope.lines.horizontal.left3.B * scope.lines.vertical.left.C - scope.lines.horizontal.left3.C * scope.lines.vertical.left.B) / (scope.lines.horizontal.left3.A * scope.lines.vertical.left.B - scope.lines.horizontal.left3.B * scope.lines.vertical.left.A),
                    y: (scope.lines.horizontal.left3.C * scope.lines.vertical.left.A - scope.lines.horizontal.left3.A * scope.lines.vertical.left.C) / (scope.lines.horizontal.left3.A * scope.lines.vertical.left.B - scope.lines.horizontal.left3.B * scope.lines.vertical.left.A)
                };

                scope.polygons.leftBottom.points[1] = {
                    x: (scope.lines.horizontal.left3.B * scope.lines.vertical.left1.C - scope.lines.horizontal.left3.C * scope.lines.vertical.left1.B) / (scope.lines.horizontal.left3.A * scope.lines.vertical.left1.B - scope.lines.horizontal.left3.B * scope.lines.vertical.left1.A),
                    y: (scope.lines.horizontal.left3.C * scope.lines.vertical.left1.A - scope.lines.horizontal.left3.A * scope.lines.vertical.left1.C) / (scope.lines.horizontal.left3.A * scope.lines.vertical.left1.B - scope.lines.horizontal.left3.B * scope.lines.vertical.left1.A)
                };

                scope.polygons.leftBottom.points[2] = {
                    x: (scope.lines.horizontal.left4.B * scope.lines.vertical.left1.C - scope.lines.horizontal.left4.C * scope.lines.vertical.left1.B) / (scope.lines.horizontal.left4.A * scope.lines.vertical.left1.B - scope.lines.horizontal.left4.B * scope.lines.vertical.left1.A),
                    y: (scope.lines.horizontal.left4.C * scope.lines.vertical.left1.A - scope.lines.horizontal.left4.A * scope.lines.vertical.left1.C) / (scope.lines.horizontal.left4.A * scope.lines.vertical.left1.B - scope.lines.horizontal.left4.B * scope.lines.vertical.left1.A)
                };

                scope.polygons.leftBottom.points[3] = {
                    x: (scope.lines.horizontal.left4.B * scope.lines.vertical.left.C - scope.lines.horizontal.left4.C * scope.lines.vertical.left.B) / (scope.lines.horizontal.left4.A * scope.lines.vertical.left.B - scope.lines.horizontal.left4.B * scope.lines.vertical.left.A),
                    y: (scope.lines.horizontal.left4.C * scope.lines.vertical.left.A - scope.lines.horizontal.left4.A * scope.lines.vertical.left.C) / (scope.lines.horizontal.left4.A * scope.lines.vertical.left.B - scope.lines.horizontal.left4.B * scope.lines.vertical.left.A)
                };

                scope.polygons.rightTop.points[0] = {
                    x: (scope.lines.horizontal.left1.B * scope.lines.vertical.left2.C - scope.lines.horizontal.left1.C * scope.lines.vertical.left2.B) / (scope.lines.horizontal.left1.A * scope.lines.vertical.left2.B - scope.lines.horizontal.left1.B * scope.lines.vertical.left2.A),
                    y: (scope.lines.horizontal.left1.C * scope.lines.vertical.left2.A - scope.lines.horizontal.left1.A * scope.lines.vertical.left2.C) / (scope.lines.horizontal.left1.A * scope.lines.vertical.left2.B - scope.lines.horizontal.left1.B * scope.lines.vertical.left2.A)
                };

                scope.polygons.rightTop.points[1] = {
                    x: (scope.lines.horizontal.left1.B * scope.lines.vertical.left3.C - scope.lines.horizontal.left1.C * scope.lines.vertical.left3.B) / (scope.lines.horizontal.left1.A * scope.lines.vertical.left3.B - scope.lines.horizontal.left1.B * scope.lines.vertical.left3.A),
                    y: (scope.lines.horizontal.left1.C * scope.lines.vertical.left3.A - scope.lines.horizontal.left1.A * scope.lines.vertical.left3.C) / (scope.lines.horizontal.left1.A * scope.lines.vertical.left3.B - scope.lines.horizontal.left1.B * scope.lines.vertical.left3.A)
                };

                scope.polygons.rightTop.points[2] = {
                    x: (scope.lines.horizontal.left2.B * scope.lines.vertical.left3.C - scope.lines.horizontal.left2.C * scope.lines.vertical.left3.B) / (scope.lines.horizontal.left2.A * scope.lines.vertical.left3.B - scope.lines.horizontal.left2.B * scope.lines.vertical.left3.A),
                    y: (scope.lines.horizontal.left2.C * scope.lines.vertical.left3.A - scope.lines.horizontal.left2.A * scope.lines.vertical.left3.C) / (scope.lines.horizontal.left2.A * scope.lines.vertical.left3.B - scope.lines.horizontal.left2.B * scope.lines.vertical.left3.A)
                };

                scope.polygons.rightTop.points[3] = {
                    x: (scope.lines.horizontal.left2.B * scope.lines.vertical.left2.C - scope.lines.horizontal.left2.C * scope.lines.vertical.left2.B) / (scope.lines.horizontal.left2.A * scope.lines.vertical.left2.B - scope.lines.horizontal.left2.B * scope.lines.vertical.left2.A),
                    y: (scope.lines.horizontal.left2.C * scope.lines.vertical.left2.A - scope.lines.horizontal.left2.A * scope.lines.vertical.left2.C) / (scope.lines.horizontal.left2.A * scope.lines.vertical.left2.B - scope.lines.horizontal.left2.B * scope.lines.vertical.left2.A)
                };

                scope.polygons.rightBottom.points[0] = {
                    x: (scope.lines.horizontal.left3.B * scope.lines.vertical.left2.C - scope.lines.horizontal.left3.C * scope.lines.vertical.left2.B) / (scope.lines.horizontal.left3.A * scope.lines.vertical.left2.B - scope.lines.horizontal.left3.B * scope.lines.vertical.left2.A),
                    y: (scope.lines.horizontal.left3.C * scope.lines.vertical.left2.A - scope.lines.horizontal.left3.A * scope.lines.vertical.left2.C) / (scope.lines.horizontal.left3.A * scope.lines.vertical.left2.B - scope.lines.horizontal.left3.B * scope.lines.vertical.left2.A)
                };

                scope.polygons.rightBottom.points[1] = {
                    x: (scope.lines.horizontal.left3.B * scope.lines.vertical.left3.C - scope.lines.horizontal.left3.C * scope.lines.vertical.left3.B) / (scope.lines.horizontal.left3.A * scope.lines.vertical.left3.B - scope.lines.horizontal.left3.B * scope.lines.vertical.left3.A),
                    y: (scope.lines.horizontal.left3.C * scope.lines.vertical.left3.A - scope.lines.horizontal.left3.A * scope.lines.vertical.left3.C) / (scope.lines.horizontal.left3.A * scope.lines.vertical.left3.B - scope.lines.horizontal.left3.B * scope.lines.vertical.left3.A)
                };

                scope.polygons.rightBottom.points[2] = {
                    x: (scope.lines.horizontal.left4.B * scope.lines.vertical.left3.C - scope.lines.horizontal.left4.C * scope.lines.vertical.left3.B) / (scope.lines.horizontal.left4.A * scope.lines.vertical.left3.B - scope.lines.horizontal.left4.B * scope.lines.vertical.left3.A),
                    y: (scope.lines.horizontal.left4.C * scope.lines.vertical.left3.A - scope.lines.horizontal.left4.A * scope.lines.vertical.left3.C) / (scope.lines.horizontal.left4.A * scope.lines.vertical.left3.B - scope.lines.horizontal.left4.B * scope.lines.vertical.left3.A)
                };

                scope.polygons.rightBottom.points[3] = {
                    x: (scope.lines.horizontal.left4.B * scope.lines.vertical.left2.C - scope.lines.horizontal.left4.C * scope.lines.vertical.left2.B) / (scope.lines.horizontal.left4.A * scope.lines.vertical.left2.B - scope.lines.horizontal.left4.B * scope.lines.vertical.left2.A),
                    y: (scope.lines.horizontal.left4.C * scope.lines.vertical.left2.A - scope.lines.horizontal.left4.A * scope.lines.vertical.left2.C) / (scope.lines.horizontal.left4.A * scope.lines.vertical.left2.B - scope.lines.horizontal.left4.B * scope.lines.vertical.left2.A)
                };

                scope.polygons.bigTop.points.push({
                    x: (scope.lines.horizontal.left1.B * scope.lines.vertical.left4.C - scope.lines.horizontal.left1.C * scope.lines.vertical.left4.B) / (scope.lines.horizontal.left1.A * scope.lines.vertical.left4.B - scope.lines.horizontal.left1.B * scope.lines.vertical.left4.A),
                    y: (scope.lines.horizontal.left1.C * scope.lines.vertical.left4.A - scope.lines.horizontal.left1.A * scope.lines.vertical.left4.C) / (scope.lines.horizontal.left1.A * scope.lines.vertical.left4.B - scope.lines.horizontal.left1.B * scope.lines.vertical.left4.A)
                });

                scope.polygons.bigTop.points.push({
                    x: (scope.lines.horizontal.left1.B * scope.lines.vertical.center.C - scope.lines.horizontal.left1.C * scope.lines.vertical.center.B) / (scope.lines.horizontal.left1.A * scope.lines.vertical.center.B - scope.lines.horizontal.left1.B * scope.lines.vertical.center.A),
                    y: (scope.lines.horizontal.left1.C * scope.lines.vertical.center.A - scope.lines.horizontal.left1.A * scope.lines.vertical.center.C) / (scope.lines.horizontal.left1.A * scope.lines.vertical.center.B - scope.lines.horizontal.left1.B * scope.lines.vertical.center.A)
                });

                scope.polygons.bigTop.points.push({
                    x: 60 - sp,
                    y: (scope.lines.horizontal.left1.C * scope.lines.vertical.left.A - scope.lines.horizontal.left1.A * scope.lines.vertical.left.C) / (scope.lines.horizontal.left1.A * scope.lines.vertical.left.B - scope.lines.horizontal.left1.B * scope.lines.vertical.left.A)
                });

                scope.polygons.bigTop.points.push({
                    x: 60 - sp,
                    y: (scope.lines.horizontal.left2.C * scope.lines.vertical.left.A - scope.lines.horizontal.left2.A * scope.lines.vertical.left.C) / (scope.lines.horizontal.left2.A * scope.lines.vertical.left.B - scope.lines.horizontal.left2.B * scope.lines.vertical.left.A)
                });

                scope.polygons.bigTop.points.push({
                    x: (scope.lines.horizontal.left2.B * scope.lines.vertical.center.C - scope.lines.horizontal.left2.C * scope.lines.vertical.center.B) / (scope.lines.horizontal.left2.A * scope.lines.vertical.center.B - scope.lines.horizontal.left2.B * scope.lines.vertical.center.A),
                    y: (scope.lines.horizontal.left2.C * scope.lines.vertical.center.A - scope.lines.horizontal.left2.A * scope.lines.vertical.center.C) / (scope.lines.horizontal.left2.A * scope.lines.vertical.center.B - scope.lines.horizontal.left2.B * scope.lines.vertical.center.A)
                });

                scope.polygons.bigTop.points.push({
                    x: (scope.lines.horizontal.left2.B * scope.lines.vertical.left4.C - scope.lines.horizontal.left2.C * scope.lines.vertical.left4.B) / (scope.lines.horizontal.left2.A * scope.lines.vertical.left4.B - scope.lines.horizontal.left2.B * scope.lines.vertical.left4.A),
                    y: (scope.lines.horizontal.left2.C * scope.lines.vertical.left4.A - scope.lines.horizontal.left2.A * scope.lines.vertical.left4.C) / (scope.lines.horizontal.left2.A * scope.lines.vertical.left4.B - scope.lines.horizontal.left2.B * scope.lines.vertical.left4.A)
                });

                scope.polygons.bigBottom.points.push({
                    x: (scope.lines.horizontal.left3.B * scope.lines.vertical.left4.C - scope.lines.horizontal.left3.C * scope.lines.vertical.left4.B) / (scope.lines.horizontal.left3.A * scope.lines.vertical.left4.B - scope.lines.horizontal.left3.B * scope.lines.vertical.left4.A),
                    y: (scope.lines.horizontal.left3.C * scope.lines.vertical.left4.A - scope.lines.horizontal.left3.A * scope.lines.vertical.left4.C) / (scope.lines.horizontal.left3.A * scope.lines.vertical.left4.B - scope.lines.horizontal.left3.B * scope.lines.vertical.left4.A)
                });

                scope.polygons.bigBottom.points.push({
                    x: (scope.lines.horizontal.left3.B * scope.lines.vertical.center.C - scope.lines.horizontal.left3.C * scope.lines.vertical.center.B) / (scope.lines.horizontal.left3.A * scope.lines.vertical.center.B - scope.lines.horizontal.left3.B * scope.lines.vertical.center.A),
                    y: (scope.lines.horizontal.left3.C * scope.lines.vertical.center.A - scope.lines.horizontal.left3.A * scope.lines.vertical.center.C) / (scope.lines.horizontal.left3.A * scope.lines.vertical.center.B - scope.lines.horizontal.left3.B * scope.lines.vertical.center.A)
                });

                scope.polygons.bigBottom.points.push({
                    x: 60 - sp,
                    y: (scope.lines.horizontal.left3.C * scope.lines.vertical.left.A - scope.lines.horizontal.left3.A * scope.lines.vertical.left.C) / (scope.lines.horizontal.left3.A * scope.lines.vertical.left.B - scope.lines.horizontal.left3.B * scope.lines.vertical.left.A)
                });

                scope.polygons.bigBottom.points.push({
                    x: 60 - sp,
                    y: (scope.lines.horizontal.left4.C * scope.lines.vertical.left.A - scope.lines.horizontal.left4.A * scope.lines.vertical.left.C) / (scope.lines.horizontal.left4.A * scope.lines.vertical.left.B - scope.lines.horizontal.left4.B * scope.lines.vertical.left.A)
                });

                scope.polygons.bigBottom.points.push({
                    x: (scope.lines.horizontal.left4.B * scope.lines.vertical.center.C - scope.lines.horizontal.left4.C * scope.lines.vertical.center.B) / (scope.lines.horizontal.left4.A * scope.lines.vertical.center.B - scope.lines.horizontal.left4.B * scope.lines.vertical.center.A),
                    y: (scope.lines.horizontal.left4.C * scope.lines.vertical.center.A - scope.lines.horizontal.left4.A * scope.lines.vertical.center.C) / (scope.lines.horizontal.left4.A * scope.lines.vertical.center.B - scope.lines.horizontal.left4.B * scope.lines.vertical.center.A)
                });

                scope.polygons.bigBottom.points.push({
                    x: (scope.lines.horizontal.left4.B * scope.lines.vertical.left4.C - scope.lines.horizontal.left4.C * scope.lines.vertical.left4.B) / (scope.lines.horizontal.left4.A * scope.lines.vertical.left4.B - scope.lines.horizontal.left4.B * scope.lines.vertical.left4.A),
                    y: (scope.lines.horizontal.left4.C * scope.lines.vertical.left4.A - scope.lines.horizontal.left4.A * scope.lines.vertical.left4.C) / (scope.lines.horizontal.left4.A * scope.lines.vertical.left4.B - scope.lines.horizontal.left4.B * scope.lines.vertical.left4.A)
                });

                var maxY = 0,
                    minY = 60,
                    shiftY = 0;
                Object.keys(scope.polygons).forEach(function (key) {
                    for (var i in scope.polygons[key].points) {
                        maxY = Math.max(maxY, scope.polygons[key].points[i].y);
                        minY = Math.min(minY, scope.polygons[key].points[i].y);
                    }
                });
                shiftY = 60 / 2 - (maxY + minY) / 2;

                Object.keys(scope.polygons).forEach(function (key) {
                    for (var i in scope.polygons[key].points) {
                        scope.polygons[key].points[i].y += shiftY;
                    }
                });
            }
        };
    });
