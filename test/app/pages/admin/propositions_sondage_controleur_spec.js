"use strict";

describe("Propositions sondage controleur", function () {


    var controleur, scope,
        Propositions = jasmine.createSpyObj("Propositions", ['query', 'save']),
        Proposition = jasmine.createSpyObj("Proposition", ['remove']);

    beforeEach(function () {
        angular.mock.module("sondage.ressource")
        angular.mock.module("pages.admin");
    });

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controleur = $controller('PropositionsSondageControleur', {
            $scope: scope,
            PropositionsSondageRessource: Propositions,
            PropositionSondageRessource: Proposition
        });
    }));

    it("doit être défini", function () {
        expect(controleur).not.toBeUndefined();
    });

    describe("Étant donné que le sondage est chargé", function () {

        beforeEach(function () {
            scope.sondage = {
                id: "id",
                adminKey: "key"
            };
            Propositions.query.andReturn([
                {label: "un"},
                {label: "deux"}
            ]);
            scope.$broadcast("SondageChargé");
        });

        it("doit charger les propositions", function () {
            expect(Propositions.query).toHaveBeenCalledWith({id: "id"});
            expect(scope.propositions).not.toBeUndefined();
            expect(scope.propositions[0].label).toBe("un");
        })

        it("doit pouvoir ajouter une proposition", function () {
            scope.nouvelleProposition = "test";

            scope.ajouteProposition();

            expect(Propositions.save).toHaveBeenCalledWith({key: "key", id: "id"}, { label: "test"}, jasmine.any(Function));
        });

        it("doit ajouter la nouvelle proposition à liste et remetter à zéro la valeur sur succes", function () {
            Propositions.save.andCallFake(function (param, value, callback) {
                callback();
            })
            scope.nouvelleProposition = "test";

            scope.ajouteProposition();

            expect(scope.propositions).toContain({label : 'test'});
            expect(scope.nouvelleProposition).toBe("");
        });

        it("doit pouvoir supprimer une proposition", function () {
            scope.supprimeProposition(scope.propositions[1]);

            expect(Proposition.remove).toHaveBeenCalledWith({id : "id", key:"key", index : 1}, jasmine.any(Function));
        });

        it("doit enlever la proposition du scope sur succes", function () {
            Proposition.remove.andCallFake(function(params, callback) {
                callback();
            });

            scope.supprimeProposition(scope.propositions[1]);

            expect(scope.propositions.length).toBe(1);
        });
    });
});
