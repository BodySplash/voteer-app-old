(function() {
    "use strict";

    angular.module("pages.sondage")
        .controller('SondageControleur', ['$scope', 'IdentiteSondage', 'SondageRessource', function($scope, identiteSondage, Sondage) {
            $scope.sondage = Sondage.get({ id : identiteSondage.id}, function() {
                $scope.$broadcast('SondageChargé');
            });
        }]);
})();