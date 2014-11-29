'use strict';

(function() {
    var app = angular.module('ports', [ 'ngRoute', 'searchModule' ]);

    app.config([ '$routeProvider', function($routeProvider) {
        $routeProvider.when('/list', {
            templateUrl : 'partials/list.html',
        }).when('/room/:number/', {
            templateUrl : 'partials/details.html'
        }).when('/room/:number/map', {
            templateUrl : 'partials/room-map.html'
        }).when('/map', {
            templateUrl : 'partials/map.html'
        }).when('/search', {
            templateUrl : 'partials/search.html'
        }).when('/search/:building/:level/:room/:day', {
            templateUrl : 'partials/results.html',
            controller: 'SearchController'
        }).when('/timetable', {
            templateUrl : 'partials/timetable.html'
        }).when('/about', {
            templateUrl : 'partials/about.html'
        }).otherwise({
            redirectTo : '/list'
        });
    } ]);
})();