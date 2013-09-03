angular.module('envProvider', [])
    .provider('env', function () {
        this.$get = function () {
            return function (url) {
                return  url;
            };
        };
    });

