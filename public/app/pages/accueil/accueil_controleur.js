(function() {
  "use strict";

    angular.module("pages.accueil", ['sondage.ressource'])
        .controller('AccueilControleur', ['$scope', '$window', 'SondagesRessource', function($scope, $window, Sondages) {
            $scope.poll = {};
            $scope.creeSondage = function() {
                Sondages.save($scope.poll, function(data) {
                    $window.location.replace("/polls/" + data.id + "/admin?key=" + data.adminKey);
                });
            }
        }]);
})();