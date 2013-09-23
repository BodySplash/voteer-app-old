(function(angular) {
    "use strict";

    angular.module("sondage.utils")
        .factory('IdentiteSondage', ['$window', function($window) {
            var uri = new URI($window.location);
            var pathArray = uri.path().split("/");
            var apiKey = uri.search(true)["key"]
            var idSondage = pathArray[2];
            return {
                id : idSondage,
                key : apiKey
            }
        }]);
})(angular);