(function() {
    angular.module("proposition.ressource")
        .factory("PropositionsSondageRessource", ['$resource', 'env', function($resource, env) {
            return $resource(env("/polls/:id/proposals"), {}, {});
        }]);
})();