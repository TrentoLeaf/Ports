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

    searchModule.controller('SearchController', ['$scope', '$routeParams', function($scope, $routeParams) {

        // save search parameters
        $scope.building = $routeParams.building;
        $scope.level = $routeParams.level;
        $scope.room = $routeParams.room;
        $scope.day = $routeParams.day;
    }]);

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
