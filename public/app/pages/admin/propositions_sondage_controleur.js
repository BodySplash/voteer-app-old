(function () {
    "use strict";

    angular.module("pages.admin")
        .controller("PropositionsSondageControleur", ['$scope', 'PropositionsSondageRessource', 'PropositionSondageRessource', function ($scope, Propositions, Proposition) {

            $scope.$on("SondageChargé", function () {
                $scope.propositions = Propositions.query({id: $scope.sondage.id});
            });

            $scope.ajouteProposition = function () {
                Propositions.save({key: $scope.sondage.adminKey, id : $scope.sondage.id}, { label: $scope.nouvelleProposition}, function () {
                    $scope.propositions.push({label : $scope.nouvelleProposition});
                    $scope.nouvelleProposition = '';
                });
            };

            $scope.supprimeProposition = function(proposition) {
                var index = _.indexOf($scope.propositions, proposition);
                Proposition.remove({id : $scope.sondage.id, key : $scope.sondage.adminKey, index : index}, function() {
                    $scope.propositions = _.without($scope.propositions, proposition);
                });
            }
        }]);
})();