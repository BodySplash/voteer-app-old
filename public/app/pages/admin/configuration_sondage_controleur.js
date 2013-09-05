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

            function metAJourSondage() {
                Sondage.update({key : $scope.sondage.adminKey}, $scope.sondage);
            }
        }]);
})();