(function() {
    "use strict";

    angular.module("pages.admin")
        .config(['$locationProvider', function($locationProvider) {
           $locationProvider.html5Mode(true);
        }])
        .controller('AdminControleur', ['$scope', '$location', 'SondageRessource', function($scope, $location, Sondage) {
            var pathArray = $location.absUrl().split("/");
            var apiKey = $location.search().key;
            var idSondage = pathArray[4];
            $scope.sondage = Sondage.get({ id : idSondage, key:apiKey}, function() {
                $scope.$broadcast('SondageChargé');
            });
        }]);
})();