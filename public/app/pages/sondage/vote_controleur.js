(function() {
    "use strict";

    angular.module("pages.sondage")
        .controller('VoteControleur', ['$scope', 'PropositionsSondageRessource', function($scope, Propositions) {

            $scope.vote =[];
            $scope.$on("SondageChargé", chargePropositions);

            $scope.votePour = function(proposition) {
              $scope.propositions = _.without($scope.propositions, proposition);
              $scope.vote.push(proposition);
            };

            $scope.annuleVotePour = function(proposition) {
                $scope.propositions.push(proposition);
                $scope.vote = _.without($scope.vote, proposition);
            };

            function chargePropositions() {
                $scope.propositions = Propositions.query({id: $scope.sondage.id});
            }
        }]);
})();