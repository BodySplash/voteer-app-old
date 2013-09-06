(function () {
    "use strict";

    angular.module("pages.admin")
        .controller("CommentairesSondageControleur", ['$scope', 'PropositionsSondageRessource', function ($scope, Propositions) {

            $scope.$on("SondageChargé", function () {
                $scope.propositions = Propositions.query({id: $scope.sondage.id});
            });
        }]);
})();