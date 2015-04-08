(function() {
    'use strict';

    // TODO: colors...
    var colDarkGreen = "#66BB6A";
    var colGreen = "#66BB6A";
    var colOrange = "orange";
    var colYellow = "#FFCA28";
    var colRed = "#EF5350";
    var colBlue = "#42A5F5";
    var lastFill = null;


    angular.module('mapModule', []).controller('MapController', [ '$scope', '$log', function($scope, $log) {

        // funzione di gestione colorazione + append mappe
        function gestisciOggetti(data, array) {
            for(var i = 0, len = array.length; i < len; i++) {

                var className = array[i].number;
                var idClassNameSvg = "#"+className.toLowerCase();
                var rect= data.select(idClassNameSvg);

                var status = null;
                if (rect != null){

                    switch(array[i].class) {
                        case 'dark-green':
                            status = colDarkGreen;
                            break;

                        case 'green':
                            status = colGreen;
                            break;

                        case 'orange':
                            status = colOrange;
                            break;

                        case 'yellow':
                            status = colYellow;
                            break;

                        case 'red':
                            status = colRed;
                            break;
                    }

                    rect.attr('fill', status);
                    rect.attr('cursor', "pointer");

                    // colore label
                    var idLabelSvg= idClassNameSvg+"t";
                    var label= data.select(idLabelSvg);
                    if (status==colGreen || status==colRed) {
                        label.attr('fill', "white");
                    } else {
                        label.attr('fill', "#lalala");
                    }
                    label.attr('cursor', "pointer");

                    // hover
                    rect.hover(function() {
                        lastFill= this.attr('fill');
                        this.attr('fill', colBlue);
                    }, function() {
                        this.attr('fill', lastFill);
                        lastFill= null;
                    });


                    // link ai dettagli di un aula
                    rect.click(function() {
                        var aula = (this.attr('id')).toUpperCase();
                        window.location = "#/details/" + aula;
                    });

                    //link ai dettagli di un aula (cliccando sul label)
                    label.click(function() {
                        var aula = (this.attr('id').toUpperCase().substring(0, this.attr('id').length-1));
                        location.href = "#/details/" + aula;
                    });

                }
            }
        }

        // function to load the maps
        function elabotate(array) {
            var snapP1PT = Snap("#SvgPovo1PT");
            Snap.load("../img/mappe/Povo1PT.svg", function(data) {
                gestisciOggetti(data, array);
                snapP1PT.append(data);
            });
            var snapP1P1 = Snap("#SvgPovo1P1");
            Snap.load("../img/mappe/Povo1P1.svg", function(data) {
                gestisciOggetti(data, array);
                snapP1P1.append(data);
            });
            var snapP2PT = Snap("#SvgPovo2PT");
            Snap.load("../img/mappe/Povo2PT.svg", function(data) {
                gestisciOggetti(data, array);
                snapP2PT.append(data);
            });
            var snapP2P1= Snap("#SvgPovo2P1");
            Snap.load("../img/mappe/Povo2P1.svg", function(data) {
                gestisciOggetti(data, array);
                snapP2P1.append(data);
            });
        }

        // wait for the data to be loaded
        if ($scope.loading) {
            $log.info("Data loadng...");

            $scope.$watch('loading', function(newValue, oldValue) {
                if (!newValue && oldValue) {
                    $log.info("Data loaded!");
                    elabotate($scope.rooms);
                }
            });

        } else {
            $log.info("Data already loaded...");
            elabotate($scope.rooms);
        }

    }]);
})();
