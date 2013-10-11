(function() {
    "use strict";

    angular.module("pages.sondage")
        .controller('VoteControleur', ['$scope', '$window', 'PropositionsSondageRessource', 'VotesSondageRessource', function($scope, $window, Propositions, Votes) {

            $scope.vote ={
                name : "",
                proposals : []
            };

            $scope.creation = false;

            $scope.$on("SondageChargé", chargePropositions);

            $scope.votePossible = function() {
              return ($scope.propositions || []).length > 0 || choixEnCours().length > 0;
            };

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
                $scope.creation = true;
                Votes.save({id: $scope.sondage.id}, $scope.vote, function() {
                    $window.location = "/thankyou?pollId=" + $scope.sondage.id
                });
            };


            function choixEnCours() {
                return $scope.vote.proposals || [];
            }

            function changeChoixEnCours(proposals) {
                $scope.vote.proposals = proposals;
            }

            function chargePropositions() {
                $scope.propositions = Propositions.query({id: $scope.sondage.id});
            }

        }]);
})();