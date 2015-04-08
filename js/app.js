(function() {
    'use strict';

    var app = angular.module('ports', [ 'listModule', 'mapModule', 'searchModule', 'detailsModule', 'errorModule', 'ngRoute']);

    // handles routes
    app.config([ '$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            redirectTo: '/list'
        }).when('/home', {
            redirectTo: '/list'
        }).when('/list', {
            templateUrl: 'partials/list.html',
            controller: 'ListController',
            controllerAs: 'ctrl'
        }).when('/map', {
            templateUrl: 'partials/map.html',
            controller: 'MapController'
        }).when('/details/:number', {
            templateUrl: 'partials/details.html',
            controller: 'DetailsController',
            controllerAs: 'ctrl'
        }).when('/search', {
            templateUrl: 'partials/search.html',
            controller: 'SearchController'
        }).when('/timetable', {
            templateUrl: 'partials/timetable.html'
        }).when('/about', {
            templateUrl: 'partials/about.html'
        }).when('/error', {
            templateUrl: 'partials/error.html',
            controller: 'ErrorController',
            controllerAs: 'ctrl'
        }).otherwise({
            redirectTo: '/error'
        });
    } ]);

    app.run([ '$rootScope', '$window', '$location', 'DataService', function($rootScope, $window, $location, DataService) {

        // check if a new cache is available on page load
        window.addEventListener('load', function(e) {
            window.applicationCache.addEventListener('updateready', function(e) {
                if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                    // browser downloaded a new app cache
                    if (confirm('È disponibile una nuova versione di TrentoLeaf+ PORTS. Vuoi caricarla ora?')) {
                        window.location.reload();
                    }
                } else {
                    // manifest didn't changed...
                }
            }, false);
        }, false);

        // google analytics
        $rootScope.$on('$viewContentLoaded', function() {
            $window.ga('send', 'pageview', { page: $location.path() });
        });

        // waiting for data...
        $rootScope.loading = true;
        $rootScope.rooms = [];

        // load rooms json
        DataService.retrieve().then(function(data) {
            $rootScope.rooms = data.data;
            $rootScope.queryDate = data.queryDate;
            $rootScope.currentDate = data.currentDate;
        }, function(error) {

            // TODO...
            $rootScope.error = true;
            window.location.href = '#/error';

        }).finally(function() {
            $rootScope.loading = false;
        });

    }]);

    // legend directive
    app.directive('legend', function() {
        return {
            restrict: 'E',
            templateUrl: '../partials/legend.html',
            replace: true
        }
    });

})();
