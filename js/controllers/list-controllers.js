(function() {
    'use strict';

    var listModule = angular.module('listModule', [ 'serviceModule' ]);
    listModule.controller('ListController', [ '$scope', function($scope) {

        // in caso di errore reindirizza alla pagina di errore
        if($scope.error) {
            window.location.href = '/#/error';
        }

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
