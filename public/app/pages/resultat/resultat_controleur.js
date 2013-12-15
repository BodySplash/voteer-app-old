(function(angular) {
    "use strict";

    angular.module("pages.resultat", ['sondage.utils', 'classement.ressource', 'sondage.ressource', 'ngSanitize'])
        .controller("ResultatControleur", ['IdentiteSondage', 'ClassementSondageRessource', 'SondageRessource', '$scope', function(identiteSondage, ClassementSondage, SondageRessource, $scope) {

            $scope.egalite = function(resultat) {
                if(resultat) {
                    return resultat.propositions.length > 1;
                }
                return false;
            };

            $scope.labelUnique = function(resultat) {
                if(resultat) {
                    return  _.first(resultat.propositions).label;
                }
                return "";
            }

            $scope.classement = ClassementSondage.query({id : identiteSondage.id}, function(data) {
                $scope.premier = _.first(data);
            });
            $scope.sondage = SondageRessource.get({id: identiteSondage.id}, function() {
                $scope.sondageCharge = true;
            });
        }]);
})(angular);