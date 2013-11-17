(function() {
    "use strict";

    angular.module("pages.private.admin")
        .controller("PrivateAdminControleur", ["$scope", "PrivateSondagesRessource", "SondageRessource", "PrivateNombresVotesSondagesRessource", function($scope, PrivateSondages, Sondage, PrivateNombresVotes) {
            $scope.sondagesLoaded = false;
            $scope.predicate = "creationDate";
            $scope.reverse = true;
            $scope.valideToken = function() {
                PrivateSondages.query({adminToken: $scope.adminToken}, function(data) {
                    $scope.sondages = data;
                    $scope.sondagesLoaded = true;
                    PrivateNombresVotes.query({adminToken: $scope.adminToken}, function(nombresVotes) {
                        _.each($scope.sondages, function(sondage) {
                            var nombre = _.find(nombresVotes, function(nombreCourant) {return nombreCourant.id == sondage.id});
                            sondage.votesCount = nombre != null ? nombre.count : 0;
                        });
                    });
                });
            };

            $scope.supprime = function(sondage) {
                Sondage.delete({id : sondage.id, key : sondage.adminKey}, function() {
                    $scope.sondages = _.without($scope.sondages, sondage);
                });
                return false;
            };
        }]);
})();