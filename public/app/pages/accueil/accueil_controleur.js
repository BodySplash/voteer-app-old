(function() {
  "use strict";

    angular.module("pages.accueil", ['sondage.ressource', 'ngVoteer'])
        .controller('AccueilControleur', ['$scope', '$window', 'SondagesRessource', function($scope, $window, Sondages) {
            $scope.poll = {};
            $scope.creation=false;
            $scope.creeSondage = function() {
                $scope.creation = true;
                Sondages.save($scope.poll, function(data) {
                    $window.location.replace("/polls/" + data.id + "/admin?key=" + data.adminKey);
                });
            }
        }]);
})();