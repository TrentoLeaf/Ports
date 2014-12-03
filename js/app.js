$(document).ready(function(){

    // visualizzazione titolo 'PORTS' completo
    var mq= window.matchMedia("(min-width: 945px)");

    mq.addListener(function(changed) {
        if(changed.matches) {
            $(".brandtitle").hover(function(){

                $(".brandtxt").show(500);
            },
                                   function(){
                $(".brandtxt").hide(2000);
            });
        } else {
            $(".brandtitle").hover(function(){
            });
        }
    });
    //END visualizzazione titolo 'PORTS' completo
});



'use strict';

(function() {
    var app = angular.module('ports', [ 'ngRoute', 'searchModule' ]);

    app.config([ '$routeProvider', function($routeProvider) {
        $routeProvider.when('/list', {
            templateUrl : 'partials/list.html',
        }).when('/details/:number/', {
            templateUrl : 'partials/details.html'
        }).when('/details/:number/map', {
            templateUrl : 'partials/room-map.html'
        }).when('/map', {
            templateUrl : 'partials/map.html'
        }).when('/search', {
            templateUrl : 'partials/search.html'
        }).when('/search/:building/:level/:room/:day', {
            templateUrl : 'partials/results.html',
            controller: 'SearchController'
        }).when('/timetable', {
            templateUrl : 'partials/timetable.html'
        }).when('/about', {
            templateUrl : 'partials/about/about.html'
        }).otherwise({
            redirectTo : '/list'
        });
    } ]);
})();
