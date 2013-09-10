(function() {
    "use strict";

    angular.module("pages.sondage")
        .controller('VoteControleur', ['$scope', 'PropositionsSondageRessource', function($scope, Propositions) {
            $scope.$on("SondageChargé", chargePropositions);

            function chargePropositions() {
                $scope.propositions = Propositions.query({id: $scope.sondage.id});
            }
        }]);
})();