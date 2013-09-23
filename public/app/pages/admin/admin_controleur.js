(function() {
    "use strict";

    angular.module("pages.admin")
        .controller('AdminControleur', ['$scope', '$window', 'SondageRessource', 'IdentiteSondage', function($scope, $window, Sondage, identiteSondage) {
            $scope.sondage = Sondage.get({ id : identiteSondage.id, key:identiteSondage.key}, function() {
                $scope.$broadcast('SondageChargé');
            });
        }]);
})();