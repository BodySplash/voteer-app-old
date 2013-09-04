(function() {
    "use strict";

    angular.module("sondage.ressource")
        .factory('SondagesRessource', ['$resource', 'env', function($resource, env) {

            return $resource(env("/polls"), {}, {

            });
        }]);
})();
