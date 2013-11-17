(function() {
    "use strict";

    angular.module("sondage.ressource")
        .factory('PrivateNombresVotesSondagesRessource', ['$resource', 'env', function($resource, env) {
            return $resource(env("/private/polls/votes-count"), {}, {});
        }]);
})();
