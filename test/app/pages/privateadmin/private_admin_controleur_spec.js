"use strict";

describe("Private Admin controleur", function () {

    var controleur, scope,
        PrivateSondages = jasmine.createSpyObj("PrivateSondages", ['query']);;

    beforeEach(function () {
        angular.mock.module("sondage.ressource");
        angular.mock.module("sondage.utils");
        angular.mock.module("pages.private.admin");
    });

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controleur = $controller("PrivateAdminControleur", {
            $scope: scope,
            PrivateSondagesRessource: PrivateSondages
        });
    }));

    it("doit être défini", function () {
        expect(controleur).toBeDefined();
    });

    it("doit charger les sondages à la validation du token", function () {
        scope.adminToken = "aa";

        scope.valideToken();

        expect(PrivateSondages.query).toHaveBeenCalledWith({adminToken: "aa"});
    });

    it("doit passer les sondages au scope à la validation du token", function () {
        var sondages = [{},{}];
        PrivateSondages.query.andReturn(sondages);

        scope.valideToken();

        expect(scope.sondages).toBe(sondages);
    });
});