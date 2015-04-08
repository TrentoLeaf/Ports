(function() {
    'use strict';

    angular.module('listModule', [ 'serviceModule' ]).controller('ListController', [ '$scope', function($scope) {

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
