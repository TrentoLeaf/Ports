'use strict';

(function() {
    var serviceModule = angular.module('serviceModule', []);

    serviceModule.service('DataService', ['$q', '$http', '$log', function($q, $http, $log) {

        /* @now in secondi! */
        this.retrieve = function() {
            // var currentDate = new Date(1417687200010),
            var currentDate = new Date(),
                queryDate = new Date(currentDate);

            DateUtilities.nextOpenDay(queryDate);
            var now = queryDate.getTime();

            var baseUrl = '//trentoleaf-api.herokuapp.com/legacy?timestamp=',
                callback = '&callback=JSON_CALLBACK',
                requests = [],
                nRequests = 13,
                data = [];

            // wrap result
            var deferred = $q.defer();

            // calculate requests timestamp
            for(var i = 0; i < nRequests; i++) {
                var time = now + 1000*60*60*i;    // richieste ogni ora
                requests.push($http.jsonp(baseUrl + time + callback, {cache: true}));
            }

            var extras = [
                {"room": "A101", "power": true, "type": "normal", "places": 200},
                {"room": "A102", "power": true, "type": "normal", "places": 160},
                {"room": "A103", "power": true, "type": "normal", "places": 160},
                {"room": "A104", "power": true, "type": "normal", "places": 160},
                {"room": "A105", "power": true, "type": "normal", "places": 160},
                {"room": "A106", "power": true, "type": "normal", "places": 160},
                {"room": "A107", "power": true, "type": "normal", "places": 70},
                {"room": "A108", "power": true, "type": "normal", "places": 70},
                {"room": "A201", "power": true, "type": "pc", "places": 56},
                {"room": "A202", "power": true, "type": "pc", "places": 56},
                {"room": "A203", "power": true, "type": "normal", "places": 70},
                {"room": "A204", "power": true, "type": "normal", "places": 87},
                {"room": "A205", "power": true, "type": "normal", "places": 87},
                {"room": "A206", "power": true, "type": "normal", "places": 126},
                {"room": "A207", "power": true, "type": "normal", "places": 110},
                {"room": "A208", "power": true, "type": "normal", "places": 90},
                {"room": "A209", "power": true, "type": "normal", "places": 55},
                {"room": "A210", "power": true, "type": "normal", "places": 70},
                {"room": "A211", "power": true, "type": "normal", "places": 35},
                {"room": "A212", "power": true, "type": "normal", "places": 55},
                {"room": "A213", "power": true, "type": "normal", "places": 33},
                {"room": "A214", "power": true, "type": "normal", "places": 33},
                {"room": "A215", "power": false, "type": "normal", "places": 33},
                {"room": "A216", "power": false, "type": "multipurpose", "places": 35},
                {"room": "A217", "power": false, "type": "multipurpose", "places": 35},
                {"room": "A218", "power": false, "type": "normal", "places": 33},
                {"room": "A219", "power": true, "type": "normal", "places": 33},
                {"room": "A220", "power": true, "type": "normal", "places": 33},
                {"room": "A221", "power": true, "type": "normal", "places": 55},
                {"room": "A222", "power": true, "type": "normal", "places": 70},
                {"room": "A223", "power": true, "type": "normal", "places": 35},
                {"room": "A224", "power": true, "type": "normal", "places": 55},
                {"room": "B101", "power": false, "type": "normal", "places": 80},
                {"room": "B102", "power": false, "type": "normal", "places": 80},
                {"room": "B103", "power": false, "type": "normal", "places": 80},
                {"room": "B104", "power": false, "type": "normal", "places": 80},
                {"room": "B105", "power": false, "type": "normal", "places": 80},
                {"room": "B106", "power": true, "type": "pc", "places": 130},
                {"room": "B107", "power": false, "type": "normal", "places": 180}
            ];

            // at the end of each http request, elaborate data...
            $q.all(requests).then(function(results) {
                $log.info("Elaborating retrieved data...");
                $log.debug(results);

                // Oggetto di ogni risposta...
                // {"statuses": [
                // {"room": "A101", "status": "free"},
                // {"room": "B107", "status": "free"}
                // ]}

                // TODO: validate

                // itero su tutte aule e setto alcuni parametri
                for(var roomIndex = 0, rooms = results[0].data.statuses, lenght = rooms.length; roomIndex < lenght; roomIndex++) {
                    var room = new Room(rooms[roomIndex].room);

                    // TODO
                    room.setExtras(extras[roomIndex]);

                    // salvo stato di tutto il giorno di questa aula... 
                    for(var i = 0; i < results.length; i++) {
                        room.states.push(results[i].data.statuses[roomIndex].status);
                    }

                    room.calculateAvaiability(queryDate, currentDate);
                    room.setFree(nRequests);
                    data.push(room);
                }

                $log.debug(data);

                deferred.resolve({data: data, queryDate: queryDate, currentDate: currentDate});

            }, function(error) {
                $log.warn(error);
                deferred.reject('API error...');
            });

            return deferred.promise;
        };

    }]);

})();
