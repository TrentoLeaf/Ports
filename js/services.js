'use strict';

(function() {
    var serviceModule = angular.module('serviceModule', []);

    serviceModule.service('DataService', ['$q', '$http', '$log', function($q, $http, $log) {

        /* @now in secondi! */
        this.retrieve = function() {
            var currentDate = new Date(),
                queryDate = new Date();

            DateUtilities.nextOpenDay(queryDate);
            var now = queryDate.getTime() / 1000;

            var baseUrl = 'http://studyspaces-unitn.tk/api/roomStatus.json?timestamp=', callback = '&callback=JSON_CALLBACK',
                requests = [],
                nRequests = 13,
                data = [];

            // wrap result
            var deferred = $q.defer();

            // calculate requests timestamp
            for(var i = 0; i < nRequests; i++) {
                var time = now + 60*60*i;    // richieste ogni ora
                requests.push($http.jsonp(baseUrl + time + callback, {cache: true}));
            }

            var extras = [
                {"room": "A101", "powerPointDesk": true, "type": "normal", "places": 200},
                {"room": "A102", "powerPointDesk": true, "type": "normal", "places": 160},
                {"room": "A103", "powerPointDesk": true, "type": "normal", "places": 160},
                {"room": "A104", "powerPointDesk": true, "type": "normal", "places": 160},
                {"room": "A105", "powerPointDesk": true, "type": "normal", "places": 160},
                {"room": "A106", "powerPointDesk": true, "type": "normal", "places": 160},
                {"room": "A107", "powerPointDesk": true, "type": "normal", "places": 70},
                {"room": "A108", "powerPointDesk": true, "type": "normal", "places": 70},
                {"room": "A201", "powerPointDesk": true, "type": "pc", "places": 56},
                {"room": "A202", "powerPointDesk": true, "type": "pc", "places": 56},
                {"room": "A203", "powerPointDesk": true, "type": "normal", "places": 70},
                {"room": "A204", "powerPointDesk": true, "type": "normal", "places": 87},
                {"room": "A205", "powerPointDesk": true, "type": "normal", "places": 87},
                {"room": "A206", "powerPointDesk": true, "type": "normal", "places": 126},
                {"room": "A207", "powerPointDesk": true, "type": "normal", "places": 110},
                {"room": "A208", "powerPointDesk": true, "type": "normal", "places": 90},
                {"room": "A209", "powerPointDesk": true, "type": "normal", "places": 55},
                {"room": "A210", "powerPointDesk": true, "type": "normal", "places": 70},
                {"room": "A211", "powerPointDesk": true, "type": "normal", "places": 35},
                {"room": "A212", "powerPointDesk": true, "type": "normal", "places": 55},
                {"room": "A213", "powerPointDesk": true, "type": "normal", "places": 33},
                {"room": "A214", "powerPointDesk": true, "type": "normal", "places": 33},
                {"room": "A215", "powerPointDesk": false, "type": "normal", "places": 33},
                {"room": "A216", "powerPointDesk": false, "type": "multipurpose", "places": 35},
                {"room": "A217", "powerPointDesk": false, "type": "multipurpose", "places": 35},
                {"room": "A218", "powerPointDesk": false, "type": "normal", "places": 33},
                {"room": "A219", "powerPointDesk": true, "type": "normal", "places": 33},
                {"room": "A220", "powerPointDesk": true, "type": "normal", "places": 33},
                {"room": "A221", "powerPointDesk": true, "type": "normal", "places": 55},
                {"room": "A222", "powerPointDesk": true, "type": "normal", "places": 70},
                {"room": "A223", "powerPointDesk": true, "type": "normal", "places": 35},
                {"room": "A224", "powerPointDesk": true, "type": "normal", "places": 55},
                {"room": "B101", "powerPointDesk": false, "type": "normal", "places": 80},
                {"room": "B102", "powerPointDesk": false, "type": "normal", "places": 80},
                {"room": "B103", "powerPointDesk": false, "type": "normal", "places": 80},
                {"room": "B104", "powerPointDesk": false, "type": "normal", "places": 80},
                {"room": "B105", "powerPointDesk": false, "type": "normal", "places": 80},
                {"room": "B106", "powerPointDesk": true, "type": "pc", "places": 130},
                {"room": "B107", "powerPointDesk": false, "type": "normal", "places": 180}
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
