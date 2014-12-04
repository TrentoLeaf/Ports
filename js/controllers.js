'use strict';
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

(function() {
    var listModule = angular.module('listModule', []);

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

        var baseUrl = 'http://studyspaces-unitn.tk/api/roomStatus.json?timestamp=';
        var callback = '&callback=JSON_CALLBACK';

        $scope.order = 'room';
        $scope.reverse = false;
        $scope.rooms = [];

        // TODO: handle errors
        $scope.loading = true;

        $log.debug("start");

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
