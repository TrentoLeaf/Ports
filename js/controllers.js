'use strict';

(function() {
    var listModule = angular.module('listModule', []);

    listModule.controller('ListController', [function() {
        // TODO
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

    detailsModule.controller('DetailsController', ['$scope', '$routeParams', function($scope, $routeParams) {

        // save search parameters
        $scope.number = $routeParams.number;
    }]);

})();
