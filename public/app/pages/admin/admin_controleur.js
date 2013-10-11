(function() {
    "use strict";

    angular.module("pages.admin")
        .controller('AdminControleur', ['$scope', '$window', 'SondageRessource', 'IdentiteSondage', function($scope, $window, Sondage, identiteSondage) {
            $scope.ajoutPropositionPossible = true;

            $scope.$on("VotesExistent", function() {
                $scope.ajoutPropositionPossible = false;
            });

            $scope.$on("PlusDeVote", function() {
                $scope.ajoutPropositionPossible = true;
            });

            $scope.sondage = Sondage.get({ id : identiteSondage.id, key:identiteSondage.key}, function() {
                $scope.$broadcast('SondageChargé');
            });
        }]);
})();