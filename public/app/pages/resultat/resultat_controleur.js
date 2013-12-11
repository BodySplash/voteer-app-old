(function(angular) {
    "use strict";

    angular.module("pages.resultat", ['sondage.utils', 'classement.ressource', 'sondage.ressource'])
        .controller("ResultatControleur", ['IdentiteSondage', 'ClassementSondageRessource', 'SondageRessource', '$scope', function(identiteSondage, ClassementSondage, SondageRessource, $scope) {
            $scope.classement = ClassementSondage.query({id : identiteSondage.id}, function(data) {
                $scope.premier = _.first(data);
            });
            $scope.sondage = SondageRessource.get({id: identiteSondage.id}, function() {
                $scope.sondageCharge = true;
            });
        }]);
})(angular);