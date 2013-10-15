(function (angular) {
    "use strict";

    angular.module("ngVoteer")
        .directive("loading", function () {

            return function (scope, element, attrs) {
                element.attr("data-loading-text", attrs.loading);

                scope.$watch(function () {
                    return scope.$eval(attrs.ngDisabled);
                }, toggleLoading);


                function toggleLoading(newVal) {
                    var loading = newVal;
                    if (loading) return element.button("loading");
                    element.button("reset");
                }
            };
        });
})(angular);