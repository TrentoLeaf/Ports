(function() {
    'use strict';

    var searchModule = angular.module('searchModule', []);

    searchModule.filter('myfilter', function() {
        return function(items, building, floor, room, power) {
            var filtered = [];

            for(var i = 0, len = items.length; i < len; i++) {
                var item = items[i];
                if (item.power == power || power == 'all') {
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

    searchModule.controller('SearchController', ['$scope', '$log', function($scope, $log) {

        // in caso di errore reindirizza alla pagina di errore
        if($scope.error) {
            window.location.href = '/#/error';
        }

        // TODO...
        $scope.roomNumbers = ['A101', 'A102', 'A103', 'A104', 'TODO', 'waiting for teo\'s JSON'];

        $scope.order = 'availability';
        $scope.reverse = true;

        $scope.building = 'all';
        $scope.floor = 'all';

        $scope.power = true;

        $scope.selectBuilding = function(value) {
            $scope.building = value;
        };

        $scope.selectFloor = function(value) {
            $scope.floor = value;
        };

        $scope.selectPower = function(value) {
            $scope.power = value;
        };

        var elaborate = function() {
            $log.warn("Elaborate");
            $log.warn($scope.rooms);

            $scope.roomNumbers = [];
            for(var i = 0, len = $scope.rooms.length; i < len; i++) {
                $scope.roomNumbers.push($scope.rooms[i].number);
            }
        }

        // aspetta che vengano caricati i dati... appena pronti, chiama elaborate
        if($scope.loading) {
            $log.warn("Data loadng... WAIT!");

            $scope.$watch('loading', function(newValue, oldValue) {

                if(!newValue && oldValue) {
                    $log.info("Data loaded!");
                    elaborate();
                }
            });

        } else {
            $log.info("Data already loaded...");
            elaborate();
        }

    }]);
})();
