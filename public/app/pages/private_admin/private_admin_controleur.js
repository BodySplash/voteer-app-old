(function() {
    "use strict";

    angular.module("pages.private.admin")
        .controller("PrivateAdminControleur", ["$scope", "PrivateSondagesRessource", function($scope, PrivateSondages) {
            $scope.valideToken = function() {
                $scope.sondages = PrivateSondages.query({adminToken: $scope.adminToken});
            };
        }]);
})();