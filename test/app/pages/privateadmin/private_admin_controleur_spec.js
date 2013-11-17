"use strict";

describe("Private Admin controleur", function () {

    var controleur, scope,
        PrivateSondages = jasmine.createSpyObj("PrivateSondages", ['query']),
        PrivateNombresVotesSondages = jasmine.createSpyObj("PrivateNombresVotesSondages", ['query']),
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
            SondageRessource : SondageRessource,
            PrivateNombresVotesSondagesRessource : PrivateNombresVotesSondages
        });
    }));

    it("doit être défini", function () {
        expect(controleur).toBeDefined();
    });

    it("doit définir le tri en date descendante", function () {
        expect(scope.predicate).toBe("creationDate");
        expect(scope.reverse).toBeTruthy();
    });

    it("doit charger les sondages à la validation du token", function () {
        scope.adminToken = "aa";

        scope.valideToken();

        expect(PrivateSondages.query).toHaveBeenCalledWith({adminToken: "aa"}, jasmine.any(Function));
    });

    it("doit passer les sondages au scope à la validation du token", function () {
        var sondages = [{},{}];
        PrivateSondages.query.andCallFake(function(options, callback) { callback(sondages);});

        scope.valideToken();

        expect(scope.sondages).toBe(sondages);
    });

    it("doit indiquer ques les sondages ont été chargées", function () {
        PrivateSondages.query.andCallFake(function(options, callback) { callback();});

        scope.valideToken();

        expect(scope.sondagesLoaded).toBeTruthy();
    });

    it("doit charger le compte des votes quand les sondages ont été chargées", function () {
        scope.adminToken = "aa";
        var sondages = [{},{}];
        PrivateSondages.query.andCallFake(function(options, callback) { callback(sondages);});

        scope.valideToken();

        expect(PrivateNombresVotesSondages.query).toHaveBeenCalledWith({adminToken: "aa"}, jasmine.any(Function));
    });

    it("doit associer le nombre de votes aux bons sondages", function () {
        var sondages = [{id: 1},{id: 2}];
        var votesCount = [{id: 2, count: 99}];
        PrivateSondages.query.andCallFake(function(options, callback) { callback(sondages);});
        PrivateNombresVotesSondages.query.andCallFake(function(options, callback) { callback(votesCount);});

        scope.valideToken();

        expect(sondages[0].votesCount).toBe(0);
        expect(sondages[1].votesCount).toBe(99);
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