"use strict";

describe("Private Admin controleur", function () {

    var controleur, scope,
        PrivateSondages = jasmine.createSpyObj("PrivateSondages", ['query']),
        SondageRessource = jasmine.createSpyObj("SondageRessource", ['delete']);

    beforeEach(function () {
        angular.mock.module("sondage.ressource");
        angular.mock.module("sondage.utils");
        angular.mock.module("pages.private.admin");
    });

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controleur = $controller("PrivateAdminControleur", {
            $scope: scope,
            PrivateSondagesRessource: PrivateSondages,
            SondageRessource : SondageRessource
        });
    }));

    it("doit être défini", function () {
        expect(controleur).toBeDefined();
    });

    it("doit charger les sondages à la validation du token", function () {
        scope.adminToken = "aa";

        scope.valideToken();

        expect(PrivateSondages.query).toHaveBeenCalledWith({adminToken: "aa"}, jasmine.any(Function));
    });

    it("doit passer les sondages au scope à la validation du token", function () {
        var sondages = [{},{}];
        PrivateSondages.query.andReturn(sondages);

        scope.valideToken();

        expect(scope.sondages).toBe(sondages);
    });

    it("doit indiquer ques les sondages ont été chargées", function () {
        PrivateSondages.query.andCallFake(function(options, callback) { callback();});

        scope.valideToken();

        expect(scope.sondagesLoaded).toBeTruthy();
    });

    describe("étant donné une liste de sondages", function() {

        var sondages;

        beforeEach(function() {
            sondages = [{id:"1", adminKey:"2"}, {id:"3", adminKey:"4"}];
            PrivateSondages.query.andReturn(sondages);
            scope.valideToken();
        });

        it("doit être possible de supprimer un sondage", function() {
           scope.supprime(sondages[0]);

           expect(SondageRessource.delete).toHaveBeenCalledWith({id:"1", key : "2"}, jasmine.any(Function))
        });

        it("doit enlever le sondage de la liste", function() {
           SondageRessource.delete.andCallFake(function(options, callback)  {
              callback();
           });

            scope.supprime(sondages[0]);

            expect(scope.sondages).not.toContain(sondages[0]);
        });
    });
});