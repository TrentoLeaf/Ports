'use strict';

var colGreen = "#66BB6A";
var colYellow = "#FFEE58";
var colRed = "#EF5350";
var lastFill=null;

(function() {
    var mapModule = angular.module('mapModule', []);

    mapModule.controller('MapController', [ '$scope', '$log', function($scope, $log) {

        var elabotate = function(array) {

            // TODO: codide jQuery qua!

            for(var i = 0, len = array.length; i < len; i++) {

                var className=array[i].room;
                var idClassNameSvg = "#"+className.toLowerCase();
                var status=null;

                if (array[i].class=='green') {
                    status=colGreen;
                }
                else if (array[i].class=='yellow') {
                    status=colYellow;
                }
                else {
                    status=colRed;
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
                    $(this).css('fill', "#0050FF");
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
