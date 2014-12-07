'use strict';

(function() {
    var listModule = angular.module('listModule', [ 'serviceModule' ]);

    listModule.controller('ListController', [ 'DataService', '$scope', function(DataService, $scope) {

        // custom filter
        $scope.isFree = function(value) {
            return (value.availability !== 0);
        };

        // parameters to load correctly list
        $scope.loading = true;
        $scope.error = false;
        $scope.order = 'availability';
        $scope.reverse = true;
        $scope.rooms = [];

        // data...
        var now = (new Date()).getTime();
        var promise = DataService.retrieve(now);

        promise.then(function(data) {
            $scope.rooms = data;
        }, function(error) {
            $scope.error = true;
        }).finally(function() {
            $scope.loading = false;
        });

    }]);
})();
