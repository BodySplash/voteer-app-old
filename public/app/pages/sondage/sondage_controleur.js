(function() {
    "use strict";

    angular.module("pages.sondage")
        .config(['$locationProvider', function($locationProvider) {
           $locationProvider.html5Mode(true);
        }])
        .controller('SondageControleur', ['$scope', '$location', 'SondageRessource', function($scope, $location, Sondage) {
            var pathArray = $location.absUrl().split("/");
            var idSondage = pathArray[4];
            $scope.sondage = Sondage.get({ id : idSondage}, function() {
                $scope.$broadcast('SondageChargé');
            });
        }]);
})();