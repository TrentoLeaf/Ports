'use strict';

var colDarkGreen = "#66BB6A"; // TODO!
var colGreen = "#66BB6A";
var colOrange = "orange";
var colYellow = "#FFCA28";
var colRed = "#EF5350";
var colBlue = "#42A5F5";
var lastFill=null;

(function() {
    var mapModule = angular.module('mapModule', []);

    mapModule.controller('MapController', [ '$scope', '$log', function($scope, $log) {

        var elabotate = function(array) {

            //load mappe

            var snapP1PT = Snap("#SvgPovo1PT");
            Snap.load("../img/mappe/Povo1PT.svg", function(data) {
                gestisciOggetti (data);
                snapP1PT.append(data);
            }) ;
            var snapP1P1 = Snap("#SvgPovo1P1");
            Snap.load("../img/mappe/Povo1P1.svg", function(data) {
                gestisciOggetti (data);
                snapP1P1.append(data);
            } ) ;
            var snapP2PT = Snap("#SvgPovo2PT");
            Snap.load("../img/mappe/Povo2PT.svg", function(data) {
                gestisciOggetti (data);
                snapP2PT.append(data);
            } ) ;
            var snapP2P1= Snap("#SvgPovo2P1");
            Snap.load("../img/mappe/Povo2P1.svg",function(data) {
                gestisciOggetti (data);
                snapP2P1.append(data);
            } ) ;


            // funzione di gestione colorazione + append mappe

            function gestisciOggetti (data) {
                for(var i = 0, len = array.length; i < len; i++) {

                    var className=array[i].number;
                    var idClassNameSvg = "#"+className.toLowerCase();
                    var rect= data.select(idClassNameSvg);

                    var status=null;
                    if (rect!=null){

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

                        //colore rect

                        rect.attr('fill', status);

                        //colore label
                        var idLabelSvg= idClassNameSvg+"t";
                        var label= data.select(idLabelSvg);
                        if (status==colGreen || status==colRed) {
                            label.attr('fill', "white");
                        }
                        else {
                            label.attr('fill', "#lalala");
                        }

                        //hover
                        rect.hover(function() {
                            lastFill= this.attr('fill');
                            this.attr('fill', colBlue);
                            // this.transform( 's1.3,1.3');
                        },
                                   function() {
                            this.attr('fill', lastFill);
                            lastFill= null;
                            //this.transform( 's1,1');
                        });


                        //link ai dettagli di un aula
                        rect.click(function() {
                            var aula= (this.attr('id')).toUpperCase();
                            location.href = "#/details/"+aula;
                        });

                    }
                }
            }
        };




        // aspetta che vengano caricati i dati... appena pronti, chiama elaborate
        if($scope.loading) {
            $log.warn("Data loadng... WAIT!");

            $scope.$watch('loading', function(newValue, oldValue) {

                if(!newValue && oldValue) {
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
