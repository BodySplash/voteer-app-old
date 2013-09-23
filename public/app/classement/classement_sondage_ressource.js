(function (angular) {

    angular.module("classement.ressource")
        .factory("ClassementSondageRessource", ['$resource', 'env', function ($resource, env) {
            return $resource(env("/polls/:id/ranking"), {}, {});
        }]);
})(angular);