(function() {
    "use strict";

    angular.module("pages.sondage")
        .controller('VoteControleur', ['$scope', 'PropositionsSondageRessource', 'VotesSondageRessource', function($scope, Propositions, Votes) {

            $scope.vote ={
                name : "",
                proposals : []
            };
            $scope.$on("SondageChargé", chargePropositions);

            $scope.votePour = function(proposition) {
              $scope.propositions = _.without($scope.propositions, proposition);
              choixEnCours().push(proposition);
            };

            $scope.annuleVotePour = function(proposition) {
                $scope.propositions.push(proposition);
                changeChoixEnCours(_.without($scope.vote.proposals, proposition));
            };

            $scope.monte = function(proposition) {
                var index = _.indexOf(choixEnCours(), proposition);
                var vote = _.without(choixEnCours(), proposition);
                changeChoixEnCours(_.union(_.first(vote, index-1), [proposition], _.rest(vote, index-1)));
            };


            $scope.descend = function(proposition) {
                var index = _.indexOf(choixEnCours(), proposition);
                var vote = _.without(choixEnCours(), proposition);
                changeChoixEnCours(_.union(_.first(vote, index+1), [proposition], _.rest(vote, index)));

            };

            $scope.valideVote = function() {
                Votes.save({id: $scope.sondage.id}, $scope.vote);
            };


            function choixEnCours() {
                return $scope.vote.proposals;
            }

            function changeChoixEnCours(proposals) {
                $scope.vote.proposals = proposals;
            }

            function chargePropositions() {
                $scope.propositions = Propositions.query({id: $scope.sondage.id});
            }

        }]);
})();