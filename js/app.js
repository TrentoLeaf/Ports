'use strict';

(function() {
    var app = angular.module('ports', [ 'listModule', 'mapModule', 'searchModule', 'detailsModule', 'ngRoute']);

    app.config([ '$routeProvider', function($routeProvider) {
        $routeProvider.when('/list', {
            templateUrl : 'partials/list.html',
            controller: 'ListController'
        }).when('/details/:number/', {
            templateUrl : 'partials/details.html',
            controller: 'DetailsController'
        }).when('/details/:number/map', {
            templateUrl : 'partials/room-map.html',
            controller: 'DetailsController'
        }).when('/map', {
            templateUrl : 'partials/map.html',
            controller: 'MapController'
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
        }).when('/results', {
            templateUrl : 'partials/results.html'
        });
    } ]);

    app.directive('load', function() {
        return {
            restrict: 'E',
            controller: function($scope, DataService) {

                // parameters to load correctly data
                $scope.loading = true;
                $scope.error = false;

                // array containing rooms data
                $scope.rooms = [];

                // calculate date
                var now = new Date();
                // DateUtilities.addDay(now, 2);
                // now.setHours(8);
                DateUtilities.roundToFollowingHalfHour(now);
                $scope.changed = DateUtilities.nextOpenTime(now);
                $scope.date = now;

                // retrieve data...
                var promise = DataService.retrieve(now);
                promise.then(function(data) {
                    $scope.rooms = data;
                }, function(error) {
                    $scope.error = true;
                }).finally(function() {
                    $scope.loading = false;
                });
            }
        };
    });
})();
