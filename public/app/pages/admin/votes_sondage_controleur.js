(function(angular) {
    "use strict";

    angular.module("pages.admin")
        .controller("VotesSondageControleur", ['$scope', 'VotesSondageRessource', 'VoteSondageRessource', function($scope, Votes, Vote) {
            $scope.$on("SondageChargé", function() {
                $scope.votes = Votes.query({id : $scope.sondage.id, key : $scope.sondage.key});
            });

            $scope.supprimeVote = function(vote) {
                var index = _.indexOf($scope.votes, vote);
                Vote.remove({id : $scope.sondage.id, key : $scope.sondage.adminKey, index : index}, function() {
                    $scope.votes = _.without($scope.votes, vote);
                });
            }
        }]);
})(angular);