(function() {
    "use strict";

    angular.module("sondage.ressource")
        .factory('PrivateSondagesRessource', ['$resource', 'env', function($resource, env) {
            return $resource(env("/private/polls"), {}, {});
        }]);
})();
