(function() {
    "use strict";

    angular.module("pages.admin")
        .controller('AdminControleur', ['$scope', '$window', 'SondageRessource', function($scope, $window, Sondage) {
            var uri = new URI($window.location);
            var pathArray = uri.path().split("/");
            var apiKey = uri.search(true)["key"]
            var idSondage = pathArray[2];
            $scope.sondage = Sondage.get({ id : idSondage, key:apiKey}, function() {
                $scope.$broadcast('SondageChargé');
            });
        }]);
})();