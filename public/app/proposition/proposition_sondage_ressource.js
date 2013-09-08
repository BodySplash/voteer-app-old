(function() {
    angular.module("proposition.ressource")
        .factory("PropositionSondageRessource", ['$resource', 'env', function($resource, env) {
            return $resource(env("/polls/:id/proposals/:index"), {}, {});
        }]);
})();