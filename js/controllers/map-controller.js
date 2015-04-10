(function() {

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



            //3d
            var zindex = 4;

            $(".D3_card_map").each(function(i){
                $(this).css("z-index",zindex);
                zindex--;
            });


            // hover 3d maps
            $(".D3_card_map").hover(function() {
                if (! $(this).hasClass("map_in_viewer")) {
                    console.log("inhover");
                    $(this).css( "transform", "translateY(100px) rotateX(-30deg) rotateZ(-20deg)");
                }
                (($(this).parent()).nextAll()).find(".D3_card_map").each (function() {
                    if (! ($(this).hasClass("map_in_viewer"))) {
                        $(this).css("transform", "translateY(200px) rotateX(-60deg) rotateZ(-40deg)");
                    }
                });
            }, function() {
                console.log("outhover");
                if (! $(this).hasClass("map_in_viewer")) {
                    $(this).css( "transform", "translateY(-10px) rotateX(-60deg) rotateZ(-40deg)");
                }
                (($(this).parent()).nextAll()).find(".D3_card_map").each (function() {
                    if (! ($(this).hasClass("map_in_viewer"))) {
                        $(this).css("transform", "translateY(-20px) rotateX(-60deg) rotateZ(-40deg)");
                    }
                });
            });

            //click 3d maps

            var put_in_viewer = function (map) {
                // centratura sull'asse x della mappa in .D3_viewer
                var ww = $(window).width();
                var ww6 = ((ww*60)/100)/2;
                var ww4 = ((ww*40)/100)/2;
                ww = ww6 + ww4;

                // dimensione della mappa rispetto a .D3_viewer
                var dimw = (($(".D3_viewer").width())*70)/100;
                var dimh = (($(".D3_viewer").height())*70)/100;

                map.css( "transform", "translateX(-"+ww+"px)");
                map.css( "width", dimw+"px");
                map.css( "height", dimh+"px");
            };

            var remove_from_viewer = function (map) {
                // traslazione x
                var ww = $(window).width();
                var ww6 = ((ww*60)/100)/2;
                var ww4 = ((ww*40)/100)/2;
                ww = (ww6 + ww4)/100;

                map.css( "transform", "translateX("+ww+"px)  rotateX(-60deg) rotateZ(-40deg)");
                map.css( "width", "150px");
                map.css( "height", "40%");
            };

            $(".D3_card_map").click(function() {
                var mapinviewer = $(".map_in_viewer");
                remove_from_viewer(mapinviewer);
                mapinviewer.removeClass("map_in_viewer");
                $(this).addClass("map_in_viewer");
                put_in_viewer($(this));
            });



            //load svg maps
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
            $log.info("Data loading...");

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
