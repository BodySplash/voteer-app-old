(function() {
    "use strict";

    angular.module("pages.private.admin")
        .controller("PrivateAdminControleur", ["$scope", "PrivateSondagesRessource", "SondageRessource", function($scope, PrivateSondages, Sondage) {
            $scope.sondagesLoaded = false;

            $scope.valideToken = function() {
                $scope.sondages = PrivateSondages.query({adminToken: $scope.adminToken}, function() {
                   $scope.sondagesLoaded = true;
                });
            };

            $scope.supprime = function(sondage) {
                Sondage.delete({id : sondage.id, key : sondage.adminKey}, function() {
                    $scope.sondages = _.without($scope.sondages, sondage);
                });
                return false;
            };
        }]);
})();