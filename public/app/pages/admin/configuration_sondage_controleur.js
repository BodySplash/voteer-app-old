(function() {
    "use strict";

    angular.module("pages.admin")
        .controller("ConfigurationSondageControleur", ['$scope', 'SondageRessource', function($scope, Sondage) {

            $scope.changeVisibilite = function(visibility) {
                $scope.sondage.visibility = visibility;
                metAJourSondage();
            };

            $scope.changeCommentaires = function(actif) {
                $scope.sondage.withComments = actif;
                metAJourSondage();
            };

            $scope.changeStatus = function(status) {
                $scope.sondage.status = status;
                metAJourSondage();
            };

            $scope.$on("SondageChargé", function() {
                $scope.configurationChargee = true;
            })

            function metAJourSondage() {
                Sondage.update({key : $scope.sondage.adminKey}, $scope.sondage);
            }
        }]);
})();