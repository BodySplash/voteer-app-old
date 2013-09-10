(function() {
    "use strict";

    angular.module("pages.sondage")
        .controller('SondageControleur', ['$scope', '$window', 'SondageRessource', function($scope, $window, Sondage) {
            var uri = new URI($window.location);
            var pathArray = uri.path().split("/");
            var idSondage = pathArray[2];
            $scope.sondage = Sondage.get({ id : idSondage}, function() {
                $scope.$broadcast('SondageChargé');
            });
        }]);
})();