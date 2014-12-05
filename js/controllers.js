'use strict';
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

(function() {
    var listModule = angular.module('listModule', []);

<<<<<<< HEAD
    var raw_now;
    var raw_1hour;
    var raw_2hour;
    var raw_3hour;
    var raw_4hour;
    var raw_5hour;

    var count = 0;
    var add = function($log, $scope) {
        count++;

        $log.warn(count);
        $log.info(raw_now);

        if(count == 6) {
            if (raw_now.length != raw_1hour.length || raw_now.length != raw_2hour.length || raw_now.length != raw_3hour.length
                || raw_now.length != raw_4hour.length || raw_now.length != raw_5hour.length) {
                $scope.error = true;

            } else {
                for(var i = 0; i < raw_now.length; i++) {

                    var n = raw_now[i].room.slice(1);
                    raw_now[i].building = "Povo " + (raw_now[i].room.contains('A') ? "1" : "2");
                    raw_now[i].floor = (n < 200 ? -1 : 0);

                    // assert...
                    $log.debug(i + " " + raw_now[i].room + " " + raw_1hour[i].room + " now=" + raw_now[i].status + " 1hour=" + raw_1hour[i].status
                               + " 2hour=" + raw_2hour[i].status + " 3hour=" + raw_3hour[i].status + " 4hour=" + raw_4hour[i].status + " 5hour=" + raw_5hour[i].status);

                    var av = 0;

                    if(raw_now[i].status == 'free') {
                        if(raw_1hour[i].status == 'free') {
                            av += 1;
                            if(raw_2hour[i].status == 'free') {
                                av += 1;
                                if(raw_3hour[i].status == 'free') {
                                    av += 1;
                                    if(raw_4hour[i].status == 'free') {
                                        av += 1;
                                        if(raw_5hour[i].status == 'free') {
                                            av += 1;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    raw_now[i].availability = av;

                    if(av >= 4) {
                        raw_now[i].class = 'green';
                    } else if (av >= 2) {
                        raw_now[i].class = 'yellow';
                    } else {
                        raw_now[i].class = 'red';
                    }

                }
            }

            $scope.rooms = raw_now;
            $scope.loading = false;

            $log.debug("end");
        }
    }

    listModule.controller('ListController', ['$scope', '$log', '$http', function($scope, $log, $http) {

        // filtro
        $scope.isFree = function(value) {
            return (value.availability !== 0);
        };

        var hour = 60 * 60;

        // TODO: togliere qualche secondo dalle ore...
        var now = (new Date()).getTime() / 1000;
        var _1hours = now + hour;
        var _2hours = now + 2*hour;
        var _3hours = now + 3*hour;
        var _4hours = now + 4*hour;
        var _5hours = now + 5*hour;
=======
    listModule.controller('ListController', ['$scope', '$log', '$http', function($scope, $log, $http) {

        // TODO: togliere qualche secondo dalle ore...
        var now = new Date();
        var _1hours = new Date();
        _1hours.setHours(now.getHours() + 1);
        var _2hours = new Date();
        _2hours.setHours(now.getHours() + 2);
        var _3hours = new Date();
        _3hours.setHours(now.getHours() + 3);
        var _4hours = new Date();
        _4hours.setHours(now.getHours() + 4);
        var _5hours = new Date();
        _5hours.setHours(now.getHours() + 5);
>>>>>>> origin/stefano

        var baseUrl = 'http://studyspaces-unitn.tk/api/roomStatus.json?timestamp=';
        var callback = '&callback=JSON_CALLBACK';

<<<<<<< HEAD
        $scope.order = 'availability';
        $scope.reverse = true;
        $scope.rooms = [];

        $scope.error = false;
=======
        $scope.order = 'room';
        $scope.reverse = false;
        $scope.rooms = [];

        // TODO: handle errors
>>>>>>> origin/stefano
        $scope.loading = true;

        $log.debug("start");

<<<<<<< HEAD
        $http.jsonp(baseUrl + now + callback).success(function(data) {
            raw_now = data['statuses'];
            $log.debug("raw_now");
            $log.debug(raw_now);
            add($log, $scope);
        }).error(function(){
            $scope.error = true;
            $scope.loading = false;
        });

        $http.jsonp(baseUrl + _1hours + callback).success(function(data) {
            raw_1hour = data['statuses'];
            $log.debug("raw_1hour");
            $log.debug(raw_1hour);
            add($log, $scope);
        }).error(function(){
            $scope.error = true;
            $scope.loading = false;
        });

        $http.jsonp(baseUrl + _2hours + callback).success(function(data) {
            raw_2hour = data['statuses'];
            $log.debug("raw_2hour");
            $log.debug(raw_2hour);
            add($log, $scope);
        }).error(function(){
            $scope.error = true;
            $scope.loading = false;
        });

        $http.jsonp(baseUrl + _3hours + callback).success(function(data) {
            raw_3hour = data['statuses'];
            $log.debug("raw_3hour");
            $log.debug(raw_3hour);
            add($log, $scope);
        }).error(function(){
            $scope.error = true;
            $scope.loading = false;
        });

        $http.jsonp(baseUrl + _4hours + callback).success(function(data) {
            raw_4hour = data['statuses'];
            $log.debug("raw_4hour");
            $log.debug(raw_4hour);
            add($log, $scope);
        }).error(function(){
            $scope.error = true;
            $scope.loading = false;
        });

        $http.jsonp(baseUrl + _5hours + callback).success(function(data) {
            raw_5hour = data['statuses'];
            $log.debug("raw_5hour");
            $log.debug(raw_5hour);
            add($log, $scope);
        }).error(function(){
            $scope.error = true;
            $scope.loading = false;
        });

        //        angular.forEach(raw_now, function(value) {
        //            value.freeNow = value.state;
        //
        //            // TODO: validate data
        //            var n = value.room.slice(1);
        //            value.building = "Povo " + (value.room.contains('A') ? "1" : "2");
        //            value.floor = (n < 200 ? -1 : 0);
        //            value.availability = 0;
        //        });
        //
        //        for(var i = 0; i < raw_now.length; i++) {
        //            if(raw_now[i].status == 'free' && raw_now[i].status == 'free') {
        //                raw_now[i].availability = 1;
        //            }
        //        }
=======
        $http.jsonp(baseUrl + now.getSeconds().toString() + callback).success(function(data_now) {
            var raw_now = data_now['statuses'];

            $log.debug("1 call (now)");

            angular.forEach(raw_now, function(value) {
                value.freeNow = value.state;

                // TODO: validate data
                var n = value.room.slice(1);
                value.building = "Povo " + (value.room.contains('A') ? "1" : "2");
                value.floor = (n < 200 ? -1 : 0);
                value.availability = 0;
            });

            $http.jsonp(baseUrl + _1hours.getSeconds().toString() + callback).success(function(data_1hour) {
                var raw_1hour = data_1hour['statuses'];

                $log.debug("2 call (1 hour)");

                for(var i = 0; i < raw_now.length; i++) {
                    if(raw_now[i].status == 'free' && raw_now[i].status == 'free') {
                        raw_now[i].availability = 1;
                    }
                }

                $scope.rooms = raw_now;
                $scope.loading = false;

                $log.debug("end");
            });
        });
>>>>>>> origin/stefano
    }]);

})();

(function() {
    var searchModule = angular.module('searchModule', []);

    searchModule.controller('SearchController', ['$scope', '$routeParams', function($scope, $routeParams) {

        // save search parameters
        $scope.building = $routeParams.building;
        $scope.level = $routeParams.level;
        $scope.room = $routeParams.room;
        $scope.day = $routeParams.day;
    }]);

})();

(function() {
    var detailsModule = angular.module('detailsModule', []);

    detailsModule.controller('DetailsController', ['$scope', '$routeParams', function($scope, $routeParams) {

        // save search parameters
        $scope.number = $routeParams.number;
    }]);

})();
