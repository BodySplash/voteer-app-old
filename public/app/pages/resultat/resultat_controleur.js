(function(angular) {
    "use strict";

    angular.module("pages.resultat", ['sondage.utils', 'classement.ressource'])
        .controller("ResultatControleur", ['IdentiteSondage', 'ClassementSondageRessource', '$scope', function(identiteSondage, ClassementSondage, $scope) {
            $scope.classement = ClassementSondage.query({id : identiteSondage.id}, function() {
                $scope.premier = _.first($scope.classement);
            });

        }]);
})(angular);