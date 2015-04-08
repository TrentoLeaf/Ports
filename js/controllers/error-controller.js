(function() {
    var errorModule = angular.module('errorModule', [ ]);

    errorModule.controller('ErrorController', [ '$interval', '$scope', function($interval, $scope) {

        $("#toHomeButton").click(function() {
            window.location.href = '/';
        });

        // se errore -> ok
        // altrimenti -> redirect to home (without refresh!)
        if($scope.error) {
            // reindirizza alla pagina iniziale dopo 8 secondi... (con refresh!)
            $interval(function() {
                window.location.href = '/';
            }, 8000);
        } else {
            window.location.href = '/#/';
        }

    }]);
})();
