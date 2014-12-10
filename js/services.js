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
            // TODO: togliere qualche secondo dalle ore...
            for(var i = 0; i < nRequests; i++) {
                var time = now + 60*60*i;    // richieste ogni ora
                requests.push($http.jsonp(baseUrl + time + callback, {cache: true}));
            }

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
