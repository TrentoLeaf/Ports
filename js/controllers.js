'use strict';

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