(function(angular) {
    "use strict";

    angular.module("pages.sondage")
        .controller("VotesSondageControleur", ['$scope', 'VotesSondageRessource', function($scope, Votes) {
            $scope.$on("SondageChargé", function() {
                if($scope.sondage.visibility == 'Public') {
                    $scope.votes = Votes.query({id : $scope.sondage.id}, function(data) {
                        $scope.$emit("VotesChargés", data.length)
                    });
                }
            });
        }]);
})(angular);