(function (angular) {
    "use strict";

    angular.module("ngVoteer")
        .directive("loader", function () {
            return {
                restrict: 'AC',
                replace: true,
                scope: { loader: '=' },
                template: '<div ng-hide="loader" class="loading"><h3><span class="label label-info">Loading...</span></h3></div>'
            };
        });
})(angular);