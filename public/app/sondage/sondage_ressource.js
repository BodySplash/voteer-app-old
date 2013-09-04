(function() {
    "use strict";

    angular.module("sondage.ressource")
        .factory('SondageRessource', ['$resource', 'env', function($resource, env) {

            return $resource(env("/polls/:id"), {}, {

            });
        }]);
})();
