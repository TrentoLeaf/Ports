'use strict';

(function() {
    var listModule = angular.module('listModule', [ 'serviceModule' ]);

    listModule.controller('ListController', [ 'DataService', '$scope', function(DataService, $scope) {

        // custom filter
        $scope.isFree = function(value) {
            return (value.availability !== 0);
        };

        $scope.order = 'availability';
        $scope.reverse = true;
    }]);
})();

(function() {
    var searchModule = angular.module('searchModule', []);

    searchModule.filter('myfilter', function() {
        return function(items, building, floor, room) {
            var filtered = [];

            for(var i = 0, len = items.length; i < len; i++) {
                var item = items[i];
                if (item.availability !== 0) {
                    if(item.building == building || building == 'all') {
                        if(item.floor == floor || floor == 'all') {
                            if(room == undefined || room == 'all' || item.number == room) {
                                filtered.push(item);
                            }
                        }
                    }
                }
            }

            return filtered;
        };
    });

    searchModule.controller('SearchController', ['$scope', function($scope) {

        // TODO...
        $scope.roomNumbers = ['A101', 'A102', 'A103', 'A104', 'TODO', 'waiting for teo\'s JSON'];

        $scope.order = 'availability';
        $scope.reverse = true;

        $scope.building = 'all';
        $scope.floor = 'all';

        $scope.selectBuilding = function(value) {
            $scope.building = value;
        };

        $scope.selectFloor = function(value) {
            $scope.floor = value;
        };

    }]);

    // TODO!
    //    searchModule.controller('ResultsController', ['$scope', '$routeParams', function($scope, $routeParams) {
    //
    //        // save search parameters
    //        $scope.building = $routeParams.building;
    //        $scope.level = $routeParams.level;
    //        $scope.room = $routeParams.room;
    //        $scope.day = $routeParams.day;
    //    }]);

})();

(function() {
    var detailsModule = angular.module('detailsModule', []);

    detailsModule.controller('DetailsController', ['$scope', '$routeParams', '$log', function($scope, $routeParams, $log) {

        // save search parameters
        $scope.number = $routeParams.number;

        // search index of array
        var index = undefined;
        for(var i = 0, rooms = $scope.rooms, len = rooms.length; i < len; i++) {
            if(rooms[i].number == $scope.number) {
                index = i;
            }
        }

        if(index == undefined) {
            $scope.notFound = true;
        } else {
            $scope.states = $scope.rooms[index].states;
            $log.info($scope.states);
        }

    }]);

})();
