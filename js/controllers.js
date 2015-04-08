(function() {
    'use strict';

    var listModule = angular.module('listModule', [ 'serviceModule' ]);

    listModule.controller('ListController', [ 'DataService', '$scope', function(DataService, $scope) {

        // in caso di errore reindirizza alla pagina di errore
        if($scope.error) {
            window.location.href = '/#/error';
        }

        // custom filter
        this.isFree = function(value) {
            return (value.availability !== 0);
        };

        this.order = 'availability';
        this.reverse = true;

        this.setOrder = function(order) {
            if(this.order === order) {
                this.reverse = !this.reverse;
            } else {
                this.reverse = false;
                this.order = order;
            }
        };

    }]);
})();

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

(function() {
    var detailsModule = angular.module('detailsModule', []);

    detailsModule.controller('DetailsController', ['$scope', '$routeParams', '$log', function($scope, $routeParams, $log) {

        // in caso di errore reindirizza alla pagina di errore
        if($scope.error) {
            window.location.href = '/#/error';
        }

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

                $scope.room = $scope.rooms[index];
                $log.info($scope.room);
            }

            //mappa dettagli aula
            var map_source=null;
            var heading_map= null;

            if ($scope.rooms[index].building=="1") {
                if ($scope.rooms[index].floor=="-1") {
                    map_source="../img/mappe/Povo1PT.svg";
                    heading_map="Povo1 - Piano Terra";

                }
                else if ($scope.rooms[index].floor=="0") {
                    map_source="../img/mappe/Povo1P1.svg";
                    heading_map="Povo1 - Primo Piano";

                }
            }
            else if ($scope.rooms[index].building=="2") {
                if ($scope.rooms[index].floor=="-1") {
                    map_source="../img/mappe/Povo2PT.svg";
                    heading_map="Povo2 - Piano Terra";

                }
                else if ($scope.rooms[index].floor=="0") {
                    map_source="../img/mappe/Povo2P1.svg";
                    heading_map="Povo2 - Primo Piano";
                }
                //if ($scope.rooms[index].number=="B106" || $scope.rooms[index].number=="B107") {
                //    map_source="../img/mappe/Povo2P1.svg";
                //}
                //else {
                //    map_source="../img/mappe/Povo2PT.svg";
                //}
            }

            $(".map_detail-heading").text(heading_map);

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

        //        // loading state
        //        if($scope.loading) {
        //
        //            // se carico bene i dati è inutile rimanere nella pagina di errore...
        //            $scope.$watch('loading', function(newValue, oldValue) {
        //                if(!newValue && oldValue && !$scope.error) {
        //                    // utente pirla
        //                    window.location.href = '/#/';
        //                }
        //            });
        //
        //            // se errore...
        //            if($scope.error) {
        //                // reindirizza alla pagina iniziale dopo 8 secondi...
        //                $interval(function() {
        //                    window.location.href = '/';
        //                }, 8000);
        //            }
        //
        //        }

        // se errore -> ok
        // altrimenti -> redirect to home (without refresh!)
        if($scope.error) {
            // reindirizza alla pagina iniziale dopo 8 secondi... (con refresh!)
            $interval(function() {
                window.location.href = '/';
            }, 8000);
        } else {
            window.location.href = '/#/';
        }

    }]);
})();
