(function() {
    'use strict';

    var app = angular.module('ports', [ 'listModule', 'mapModule', 'searchModule', 'detailsModule', 'errorModule', 'ngRoute']);

    // handles routes
    app.config([ '$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            redirectTo: '/list'
        }).when('/home', {
            redirectTo: '/list'
        }).when('/list', {
            templateUrl: 'partials/list.html',
            controller: 'ListController',
            controllerAs: 'ctrl'
        }).when('/map', {
            templateUrl: 'partials/map.html',
            controller: 'MapController'
        }).when('/map3d', {
            templateUrl: 'partials/map3d.html',
            controller: 'MapController'
        }).when('/details/:number', {
            templateUrl: 'partials/details.html',
            controller: 'DetailsController',
            controllerAs: 'ctrl'
        }).when('/search', {
            templateUrl: 'partials/search.html',
            controller: 'SearchController'
        }).when('/timetable', {
            templateUrl: 'partials/timetable.html'
        }).when('/about', {
            templateUrl: 'partials/about.html'
        }).when('/error', {
            templateUrl: 'partials/error.html',
            controller: 'ErrorController',
            controllerAs: 'ctrl'
        }).otherwise({
            redirectTo: '/error'
        });
    } ]);

    app.run([ '$rootScope', '$window', '$location', 'DataService', function($rootScope, $window, $location, DataService) {

        // check if a new cache is available on page load
        window.addEventListener('load', function(e) {
            window.applicationCache.addEventListener('updateready', function(e) {
                if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                    // browser downloaded a new app cache
                    if (confirm('È disponibile una nuova versione di Ports. Vuoi caricarla ora?')) {
                        window.location.reload();
                    }
                }
            }, false);
        }, false);

        // google analytics
        $rootScope.$on('$viewContentLoaded', function() {
            $window.ga('send', 'pageview', { page: $location.path() });
        });

        // waiting for data...
        $rootScope.loading = true;
        $rootScope.rooms = [];

        // load rooms json
        DataService.retrieve().then(function(data) {
            $rootScope.rooms = data.data;
            $rootScope.queryDate = data.queryDate;
            $rootScope.currentDate = data.currentDate;
        }, function(error) {

            // TODO...
            $rootScope.error = true;
            window.location.href = '#/error';

        }).finally(function() {
            $rootScope.loading = false;
        });

    }]);

    // legend directive
    app.directive('legend', function() {
        return {
            restrict: 'E',
            templateUrl: '../partials/legend.html',
            replace: true
        }
    });

})();


$(document).ready(function(){

    var img = "<img src=\"/img/navbar_icons/minimizedNavbar.png\">";
    var imgReversed = "<img src=\"/img/navbar_icons/reverseMinNav.png\">";
    var toggleMenu = "";

    var reverse = true;

    $(".hamburger").click(function(){
        $(".hamburger").empty();
        if(reverse){
            $(".hamburger").append(imgReversed);
            reverse = false;
            $(".mobileMenu").removeClass("hide");
        }else{
            $(".hamburger").append(img);
            reverse = true;
            $(".mobileMenu").addClass("hide");
        };
    });


});

$(document).ready(function(){

    /* Hover icone navbar */
    var changeColor = function(element, color) {
        $(element).find("div").css("color",color); //cambio colore testo
    };

    var changeIcon = function (element, from, to) { //from, to: nome della parte di directory da cambiare
        var dir=$(element).find("img").attr("src");
        var newdir = dir.replace(from, to);
        $(element).find("img").attr("src",newdir);
    };

    $(".navelenco").hover(function() {
        changeColor(".navelenco", "white"); //cambio colore testo
        changeIcon(".navelenco", "default", "mono_white");
    },
                          function() {
        changeColor(".navelenco", "black"); //cambio colore testo
        changeIcon(".navelenco", "mono_white", "default");
    });

    $(".navmappa").hover(function() {
        changeColor(".navmappa", "white"); //cambio colore testo
        changeIcon(".navmappa", "default", "mono_white");
    },
                         function() {
        changeColor(".navmappa", "black"); //cambio colore testo
        changeIcon(".navmappa", "mono_white", "default");
    });

    $(".navcerca").hover(function() {
        changeColor(".navcerca", "white"); //cambio colore testo
        changeIcon(".navcerca", "default", "mono_white");
    },
                         function() {
        changeColor(".navcerca", "black"); //cambio colore testo
        changeIcon(".navcerca", "mono_white", "default");
    });

    $(".navorari").hover(function() {
        changeColor(".navorari", "white"); //cambio colore testo
        changeIcon(".navorari", "default", "mono_white");
    },
                         function() {
        changeColor(".navorari", "black"); //cambio colore testo
        changeIcon(".navorari", "mono_white", "default");
    });
    /* END Hover icone navbar END*/
});


/*Smooth scroll function*/
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});



(function() {
    angular.module('detailsModule', []).controller('DetailsController', ['$scope', '$routeParams', '$log', '$location', function($scope, $routeParams, $log, $location) {

        // save reference to the controller
        var ctrl = this;

        // save search parameters
        ctrl.number = $routeParams.number;

        // function to be called when the page is loaded
        var elaborate = function() {

            // search index of array
            var index = undefined;
            for(var i = 0, rooms = $scope.rooms, len = rooms.length; i < len; i++) {
                if(rooms[i].number == ctrl.number) {
                    index = i;
                }
            }

            // check if the room number is valid
            if (index == undefined) {
                $location.path('error');
            } else {

                // make this room accessible from the html
                ctrl.room = $scope.rooms[index];
                ctrl.states = ctrl.room.states;

                // map -> room location
                var map_source = null;
                ctrl.heading = null;

                // load correct map
                if (ctrl.room.building === 1) {
                    if (ctrl.room.floor === -1) {
                        map_source="../img/mappe/Povo1PT.svg";
                        ctrl.heading="Povo1 - Piano Terra";
                    } else if (ctrl.room.floor === 0) {
                        map_source="../img/mappe/Povo1P1.svg";
                        ctrl.heading="Povo1 - Primo Piano";
                    }
                } else if (ctrl.room.building === 2) {
                    if (ctrl.room.floor === -1) {
                        map_source="../img/mappe/Povo2PT.svg";
                        ctrl.heading="Povo2 - Piano Terra";
                    } else if (ctrl.room.floor === 0) {
                        map_source="../img/mappe/Povo2P1.svg";
                        ctrl.heading="Povo2 - Primo Piano";
                    }
                }

                // load map
                if (map_source != null) {
                    var s = Snap("#map_detail");
                    Snap.load(map_source, onSVGLoaded) ;
                }

                // function to load a SVG
                function onSVGLoaded( data ){
                    var rectID= "#"+(ctrl.room.number).toLowerCase();
                    var rect = data.select(rectID);
                    rect.attr("fill", "#42A5F5");
                    s.append( data );
                }

            }
        }

        // wait for data to load
        if($scope.loading) {
            $log.debug("Data loadng...");

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
    'use strict';

    angular.module('errorModule', []).controller('ErrorController', [ '$location', function($location) {
        this.redirect = function() {
            $location.path("/");
        }
    }]);

})();

(function() {
    'use strict';

    angular.module('listModule', [ 'serviceModule' ]).controller('ListController', [ '$scope', function($scope) {

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
    'use strict';

    var serviceModule = angular.module('serviceModule', []);
    serviceModule.service('DataService', ['$q', '$http', '$log', function($q, $http, $log) {

        this.retrieve = function() {

            var currentDate = new Date(),
                queryDate = new Date(currentDate);

            DateUtilities.nextOpenDay(queryDate);
            var now = queryDate.getTime();

            var baseUrl = 'http://api.trentoleaf.tk/app?time=',
                requests = [],
                data = [];

            var extras = [
                {room: "A101", power: true, type: "normal", places: 200},
                {room: "A102", power: true, type: "normal", places: 160},
                {room: "A103", power: true, type: "normal", places: 160},
                {room: "A104", power: true, type: "normal", places: 160},
                {room: "A105", power: true, type: "normal", places: 160},
                {room: "A106", power: true, type: "normal", places: 160},
                {room: "A107", power: true, type: "normal", places: 70},
                {room: "A108", power: true, type: "normal", places: 70},
                {room: "A201", power: true, type: "pc", places: 56},
                {room: "A202", power: true, type: "pc", places: 56},
                {room: "A203", power: true, type: "normal", places: 70},
                {room: "A204", power: true, type: "normal", places: 87},
                {room: "A205", power: true, type: "normal", places: 87},
                {room: "A206", power: true, type: "normal", places: 126},
                {room: "A207", power: true, type: "normal", places: 110},
                {room: "A208", power: true, type: "normal", places: 90},
                {room: "A209", power: true, type: "normal", places: 55},
                {room: "A210", power: true, type: "normal", places: 70},
                {room: "A211", power: true, type: "normal", places: 35},
                {room: "A212", power: true, type: "normal", places: 55},
                {room: "A213", power: true, type: "normal", places: 33},
                {room: "A214", power: true, type: "normal", places: 33},
                {room: "A215", power: false, type: "normal", places: 33},
                {room: "A216", power: false, type: "multipurpose", places: 35},
                {room: "A217", power: false, type: "multipurpose", places: 35},
                {room: "A218", power: false, type: "normal", places: 33},
                {room: "A219", power: true, type: "normal", places: 33},
                {room: "A220", power: true, type: "normal", places: 33},
                {room: "A221", power: true, type: "normal", places: 55},
                {room: "A222", power: true, type: "normal", places: 70},
                {room: "A223", power: true, type: "normal", places: 35},
                {room: "A224", power: true, type: "normal", places: 55},
                {room: "B101", power: false, type: "normal", places: 80},
                {room: "B102", power: false, type: "normal", places: 80},
                {room: "B103", power: false, type: "normal", places: 80},
                {room: "B104", power: false, type: "normal", places: 80},
                {room: "B105", power: false, type: "normal", places: 80},
                {room: "B106", power: true, type: "pc", places: 130},
                {room: "B107", power: false, type: "normal", places: 180}
            ];

            // wrap result
            var deferred = $q.defer();

            var http = $http.get(baseUrl + now, {cache: true});

            http.success(function(result) {
                $log.debug("result");
                $log.debug(result);

                $log.debug("extras");
                $log.debug(extras);

                for(var i = 0, length = extras.length; i < length; i++) {
                    var room = new Room(extras[i].room);

                    room.setExtras(extras[i]);
                    room.states = result[room.number.toLowerCase()];
                    room.calculateAvaiability(queryDate, currentDate);
                    room.setFree(13);

                    data.push(room);
                }

                $log.debug("data");
                $log.debug(data);

                deferred.resolve({data: data, queryDate: queryDate, currentDate: currentDate});

            });

            http.error(function(error) {
                $log.warn(error);
                deferred.reject('API error...');
            });

            return deferred.promise;
        };

    }]);

})();

DateUtilities = {

    OPEN: 8,
    CLOSE: 20,

    addDay : function(date, days) {
        date.setHours(date.getHours() + 24*days);
    },

    roundToFollowingHalfHour : function(date) {
        date.setMilliseconds(0);
        date.setSeconds(0);

        if(date.getMinutes() < 30) {
            date.setMinutes(30);
        }

        if(date.getMinutes() > 30) {
            date.setMinutes(30);
            date.setHours(date.getHours() + 1);
        }
    },

    nextOpenDay : function(date) {
        if(date.getHours() >= this.CLOSE) {
            this.addDay(date, 1);
        }
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(30);
        date.setHours(7);
    }

};

'use strict';
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

// definition of Room object
var Room = function(number) {
    this.number = number + '';
    this.building = this.number.contains('A') ? 1 : 2;
    this.floor = (this.number == 'B106' || this.number == 'B107') ? 0 : (this.number.slice(1) < 200 ? -1 : 0);

    // disponibilità di default nulla
    this.availability = 0;
    this.states = [];
}

Room.prototype.calculateAvaiability = function(queryTime, currentTime) {

    if(this.states.length == 0) {
        throw "Please set variable 'states' before calling this method";
    }

    var diff = 0;
    if(queryTime.getTime() < currentTime.getTime()) {
        diff = currentTime.getHours() - queryTime.getHours();
    }

    // calcolo disponibilità da quest'ora
    for(var i = diff; i < this.states.length; i++) {
        if(this.states[i]) {
            this.availability += 1;
        } else {
            break;
        }
    }

    // set color
    switch(this.availability) {
        case 0:
            this.class = 'red';
            break;

        case 1:
        case 2:
            this.class = 'orange';
            break;

        case 3:
        case 4:
            this.class = 'yellow';
            break;

        case 5:
        case 6:
            this.class = 'green';
            break;

        default:
            this.class = 'dark-green';
    }
};

Room.prototype.setFree = function(n) {
    this.free = (this.availability == n);
};

Room.prototype.setExtras = function(o) {
    this.type = o.type;
    this.power = o.power;
    this.places = o.places;

    if(this.places <= 40) {
        this.size = 'tiny';
    } else if(this.places <= 55) {
        this.size = 'small';
    } else if (this.places <= 90) {
        this.size = 'middle';
    } else if(this.places <= 160) {
        this.size = 'big';
    } else {
        this.size = 'huge';
    }

    this.card = (this.building == 2);
}
