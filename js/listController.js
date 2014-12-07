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
