//'use strict';

(function() {
    var serviceModule = angular.module('serviceModule', []);

    serviceModule.service('DataService', ['$q', '$http', '$log', function($q, $http, $log) {

        /* @now in secondi! */
        this.retrieve = function() {
            var currentDate = new Date(),
                queryDate = new Date();

            queryDate.setHours(queryDate.getHours() + 5);

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

                    // OK
                    //data.push({room : rooms[roomIndex].room, availability: 0, states: []});
                    //for(var i = 0; i < results.length; i++) {
                    //    if(results[i].data.statuses[roomIndex].status == 'free') {
                    //        data[roomIndex].availability += 1;
                    //    } else {
                    //        break;
                    //    }
                    //}

                    // TODO!
                    // var logString = "";
                    // logString += roomIndex + " " + rooms[roomIndex].room + " ";
                    // for(var i = 0; i < results.length; i++) {
                    //     logString += results[i].data.statuses[roomIndex].status + " ";
                    // }
                    // $log.debug(logString);

                    var room = new Room(rooms[roomIndex].room);

                    // salvo stato di tutto il giorno di questa aula... 
                    for(var i = 0; i < results.length; i++) {
                        room.states.push(results[i].data.statuses[roomIndex].status);
                    }

                    room.calculateAvaiability(queryDate, currentDate);
                    room.setFree(nRequests);
                    data.push(room);
                }

                //                for(var i = 0, lenght = rooms.length; i < lenght; i++) {
                //                    data[i].building = rooms[i].room.contains('A') ? "1" : "2";
                //                    data[i].floor = rooms[i].room.slice(1) < 200 ? -1 : 0;
                //
                //                    switch(data[i].availability) {
                //                        case 1:
                //                        case 2:
                //                            data[i].class = 'red';
                //                            break;
                //                        case 3:
                //                        case 4:
                //                            data[i].class = 'yellow';
                //                            break;
                //                        case 5:
                //                        case 6:
                //                            data[i].class = 'green';
                //                            break;
                //
                //                        default:
                //                            data[i].class = 'green';
                //                    }
                //
                //                    data[i].free = (data[i].availability == nRequests);
                //                }

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
