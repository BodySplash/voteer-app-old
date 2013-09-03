(function() {
    "use strict";

    angular.module("sondage.ressource", ['envProvider', 'ngResource'])
        .factory('SondagesRessource', ['$resource', 'env', function($resource, env) {

            return $resource(env("/polls"), {}, {

            });
        }]);
})();
