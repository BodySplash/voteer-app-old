(function() {
    "use strict";

    angular.module("vote.ressource")
        .factory('VotesSondageRessource', ['$resource', 'env', function($resource, env) {
            return $resource(env("/polls/:id/votes"), {}, {});
        }]);

})();