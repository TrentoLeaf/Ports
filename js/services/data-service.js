(function() {
    'use strict';

    var serviceModule = angular.module('serviceModule', []);
    serviceModule.service('DataService', ['$q', '$http', '$log', function($q, $http, $log) {

        this.retrieve = function() {

            var currentDate = new Date(),
                queryDate = new Date(currentDate);

            DateUtilities.nextOpenDay(queryDate);
            var now = queryDate.getTime();

            var baseUrl = 'https://trentoleaf-api.herokuapp.com/app?time=',
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
