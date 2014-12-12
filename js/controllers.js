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
})();

(function() {
    var detailsModule = angular.module('detailsModule', []);

    detailsModule.controller('DetailsController', ['$scope', '$routeParams', '$log', function($scope, $routeParams, $log) {

        // save search parameters
        $scope.number = $routeParams.number;

        var elaborate = function() {

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

            //mappa dettagli aula
            var map_source=null;

            if ($scope.rooms[index].building=="1") {
                if ($scope.rooms[index].floor=="-1") {
                    map_source="../img/mappe/Povo1PT.svg";
                }
                else if ($scope.rooms[index].floor=="0") {
                    map_source="../img/mappe/Povo1P1.svg";
                }
            }
            else if ($scope.rooms[index].building=="2") {
                if ($scope.rooms[index].floor=="-1") {
                    map_source="../img/mappe/Povo2PT.svg";
                }
                else if ($scope.rooms[index].floor=="0") {
                    map_source="../img/mappe/Povo2P1.svg";
                }
                //if ($scope.rooms[index].number=="B106" || $scope.rooms[index].number=="B107") {
                //    map_source="../img/mappe/Povo2P1.svg";
                //}
                //else {
                //    map_source="../img/mappe/Povo2PT.svg";
                //}
            }

            if (map_source!=null) {
                var s = Snap("#map_detail");
                Snap.load(map_source, onSVGLoaded ) ;
            }
            function onSVGLoaded( data ){
                var rectID= "#"+($scope.rooms[index].number).toLowerCase();
                var rect = data.select(rectID);
                rect.attr("fill", "#42A5F5");
                s.append( data );
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

(function() {
    var errorModule = angular.module('errorModule', [ ]);

    errorModule.controller('ErrorController', [ '$interval', '$scope', function($interval, $scope) {

        $("#toHomeButton").click(function() {
            window.location.href = '/';
        });

        // reindirizza alla pagina iniziale dopo 8 secondi...
        $interval(function() {
            window.location.href = '/';
        }, 8000);

        $scope.$watch('loading', function(newValue, oldValue) {
            if(!newValue && oldValue) {
                if(!$scope.error) {
                    // utente pirla
                    window.location.href = '/#/';
                }
            }
        });

    }]);
})();
