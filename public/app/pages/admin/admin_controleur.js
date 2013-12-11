(function() {
    "use strict";

    angular.module("pages.admin")
        .controller('AdminControleur', ['$scope', '$window', 'SondageRessource', 'IdentiteSondage', function($scope, $window, Sondage, identiteSondage) {
            $scope.aucunVote = true;

            $scope.$on("VotesExistent", function() {
                $scope.aucunVote = false;
            });

            $scope.$on("PlusDeVote", function() {
                $scope.aucunVote = true;
            });

            $scope.sondage = Sondage.get({ id : identiteSondage.id, key:identiteSondage.key}, function() {
                $scope.sondageCharge = true;
                $scope.$broadcast('SondageChargé');
            });

            $scope.ajoutPropositionPossible = function() {
                return $scope.aucunVote && $scope.sondage.status == 'Ouvert';
            };
        }]);
})();