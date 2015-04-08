(function() {
    'use strict';

    angular.module('errorModule', []).controller('ErrorController', [ '$location', function($location) {
        this.redirect = function() {
            $location.path("/");
        }
    }]);

})();
