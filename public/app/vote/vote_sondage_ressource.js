(function() {
    angular.module("vote.ressource")
        .factory("VoteSondageRessource", ['$resource', 'env', function($resource, env) {
            return $resource(env("/polls/:id/votes/:index"), {}, {});
        }]);
})();