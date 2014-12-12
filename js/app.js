'use strict';

(function() {
    var app = angular.module('ports', [ 'listModule', 'mapModule', 'searchModule', 'detailsModule', 'errorModule', 'ngRoute']);

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
            templateUrl : 'partials/search.html',
            controller: 'SearchController'
        }).when('/timetable', {
            templateUrl : 'partials/timetable.html'
        }).when('/about', {
            templateUrl : 'partials/about.html'
        }).when('/error', {
            templateUrl : 'partials/error.html',
            controller: 'ErrorController'
        }).otherwise({
            redirectTo : '/list'
        });
    } ]);

    app.directive('load', [ '$log', function($log) {
        return {
            restrict: 'A',
            controller: function($scope, DataService) {

                // parameters to load correctly data
                $scope.loading = true;
                $scope.error = false;

                // array containing rooms data
                $scope.rooms = [];

                var promise = DataService.retrieve();
                promise.then(function(data) {
                    $scope.rooms = data.data;
                    $scope.queryDate = data.queryDate;
                    $scope.currentDate = data.currentDate;
                }, function(error) {
                    $scope.error = true;

                    $log.info("Errore API...");
                    window.location.href = '#/error';
                }).finally(function() {
                    $scope.loading = false;
                });

            }
        };
    }]);
})();
