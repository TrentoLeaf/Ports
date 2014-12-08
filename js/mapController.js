'use strict';

(function() {
    var mapModule = angular.module('mapModule', []);

    mapModule.controller('MapController', [ '$scope', '$log', function($scope, $log) {

        // TODO: code here
        $scope.rooms;
        $log.debug($scope.rooms);

    }]);
})();
