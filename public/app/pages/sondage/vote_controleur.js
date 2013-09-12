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

            $scope.monte = function(proposition) {
                var index = _.indexOf($scope.vote, proposition);
                var vote = _.without($scope.vote, proposition);
                $scope.vote = _.union(_.first(vote, index-1), [proposition], _.rest(vote, index-1));
            };

            $scope.descend = function(proposition) {
                var index = _.indexOf($scope.vote, proposition);
                var vote = _.without($scope.vote, proposition);
                $scope.vote = _.union(_.first(vote, index+1), [proposition], _.rest(vote, index));
            };

            function chargePropositions() {
                $scope.propositions = Propositions.query({id: $scope.sondage.id});

            }
        }]);
})();