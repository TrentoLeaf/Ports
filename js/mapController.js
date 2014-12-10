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

            // TODO: codide jQuery qua!

            for(var i = 0, len = array.length; i < len; i++) {

                var className=array[i].number;
                var idClassNameSvg = "#"+className.toLowerCase();
                var status=null;

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

                $(idClassNameSvg).css('fill', status);

                if (status==colGreen || status==colRed) {
                    var idLabelSvg= idClassNameSvg+"t";
                    $(idLabelSvg).css('fill', "white");
                }
                else {
                    var idLabelSvg= idClassNameSvg+"t";
                    $(idLabelSvg).css('fill', "#lalala");
                }

                $(idClassNameSvg).mouseover(function() {
                    lastFill=  $(this).css('fill');
                    $(this).css('fill', colBlue);
                });

                $(idClassNameSvg).mouseleave(function() {
                    $(this).css('fill', lastFill);
                    lastFill= null;
                });

                $(idClassNameSvg).click(function() {
                    //link ai dettagli di un aula
                });

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
