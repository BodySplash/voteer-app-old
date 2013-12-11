(function() {
    "use strict";

    angular.module("pages.sondage")
        .controller('SondageControleur', ['$scope', '$window', 'IdentiteSondage', 'SondageRessource', function($scope, $window, identiteSondage, Sondage) {
            $scope.sondage = Sondage.get({ id : identiteSondage.id}, function() {
                $scope.sondageCharge = true;
                $window.document.title = $scope.sondage.name + " - " + $window.document.title;
                $scope.$broadcast('SondageChargé');
            });

            $scope.afficheVote = function() {
                return $scope.sondage.visibility == 'Public';
            }

            $scope.sondageFerme = function () {
                return $scope.sondage.status == "Ferme";
            }

            $scope.$on("VotesChargés", function(event, nombre) {
               $scope.nombreVotes = nombre;
            });
        }]);
})();