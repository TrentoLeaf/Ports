(function() {
    'use strict';

    angular.module('detailsModule', []).controller('DetailsController', ['$scope', '$routeParams', '$log', '$location', function($scope, $routeParams, $log, $location) {

        // save reference to the controller
        var ctrl = this;

        // save search parameters
        $scope.number = $routeParams.number;

        // function to be called when the page is loaded
        var elaborate = function() {

            // search index of array
            var index = undefined;
            for(var i = 0, rooms = $scope.rooms, len = rooms.length; i < len; i++) {
                if(rooms[i].number == $scope.number) {
                    index = i;
                }
            }

            // check if the room number is valid
            if (index == undefined) {
                $location.path('error');
            } else {

                ctrl.room = $scope.rooms[index];
                ctrl.states = ctrl.room.states;

                // mappa dettagli aula
                var map_source = null;
                var heading_map = null;

                if (ctrl.room.building=="1") {
                    if (ctrl.room.floor=="-1") {
                        map_source="../img/mappe/Povo1PT.svg";
                        heading_map="Povo1 - Piano Terra";
                    }
                    else if (ctrl.room.floor=="0") {
                        map_source="../img/mappe/Povo1P1.svg";
                        heading_map="Povo1 - Primo Piano";
                    }
                }
                else if (ctrl.room.building=="2") {
                    if (ctrl.room.floor=="-1") {
                        map_source="../img/mappe/Povo2PT.svg";
                        heading_map="Povo2 - Piano Terra";

                    }
                    else if (ctrl.room.floor=="0") {
                        map_source="../img/mappe/Povo2P1.svg";
                        heading_map="Povo2 - Primo Piano";
                    }
                }

                $(".map_detail-heading").text(heading_map);

                if (map_source != null) {
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
