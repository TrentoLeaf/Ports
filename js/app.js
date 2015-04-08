(function() {
    'use strict';

    var app = angular.module('ports', [ 'listModule', 'mapModule', 'searchModule', 'detailsModule', 'errorModule', 'ngRoute']);

    // handles routes
    app.config([ '$routeProvider', function($routeProvider) {
        $routeProvider.when('/list', {
            templateUrl : 'partials/list.html',
            controller: 'ListController',
            controllerAs: 'ctrl'
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

    // handles manifest changes
    app.controller('CacheController', function() {
        // Check if a new cache is available on page load.
        window.addEventListener('load', function(e) {
            window.applicationCache.addEventListener('updateready', function(e) {
                if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                    // Browser downloaded a new app cache.
                    if (confirm('È disponibile una nuova versione di TrentoLeaf+ PORTS. Vuoi caricarla ora?')) {
                        window.location.reload();
                    }
                } else {
                    // Manifest didn't changed. Nothing new to server.
                }
            }, false);
        }, false);
    });

    // google analytics
    app.run([ '$rootScope', '$window', '$location', function($rootScope, $window, $location) {
        var track = function() {
            $window.ga('send', 'pageview', { page: $location.path() });
        };
        $rootScope.$on('$viewContentLoaded', track);
    }]);

    // legend directive
    app.directive('legend', function() {
        return {
            restrict: 'E',
            templateUrl: '../partials/legend.html',
            replace: true
        }
    });

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
