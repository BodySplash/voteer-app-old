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

        var appelSucces;

        beforeEach(function () {
            appelSucces = true;
            scope.sondage = {
                id: "id",
                adminKey: "key"
            };
            Propositions.query.andCallFake(function(params, callback) {
                callback();
                return [
                    {label: "un"},
                    {label: "deux"}
                ];
            })
            Propositions.save.andCallFake(function(params, options, succes, erreur) {
                if(appelSucces) {
                    succes();
                    return;
                }
                erreur();
            });
            scope.$broadcast("SondageChargé");
        });

        it("doit charger les propositions", function () {
            expect(Propositions.query).toHaveBeenCalledWith({id: "id"}, jasmine.any(Function));
            expect(scope.propositions).not.toBeUndefined();
            expect(scope.propositions[0].label).toBe("un");
        });

        it("doit dire que les propositions sont chargées", function() {
            expect(scope.propositionsChargees).toBeTruthy()
        });

        it("doit pouvoir ajouter une proposition", function () {
            scope.nouvelleProposition = "test";

            scope.ajouteProposition();

            expect(Propositions.save).toHaveBeenCalledWith({key: "key", id: "id"}, { label: "test"}, jasmine.any(Function), jasmine.any(Function));
            expect(scope.ajoutValide).toBeTruthy();
        });

        it("doit ajouter la nouvelle proposition à liste et remetter à zéro la valeur sur succes", function () {
            scope.nouvelleProposition = "test";

            scope.ajouteProposition();

            expect(scope.propositions).toContain({label : 'test'});
            expect(scope.nouvelleProposition).toBe("");
        });

        it("doit prévenir sur erreur ajout", function () {
            scope.nouvelleProposition = "test";
            appelSucces = false;

            scope.ajouteProposition();

            expect(scope.ajoutValide).toBeFalsy();
        });

        it("n'ajoute pas de proposition vide", function () {
            scope.nouvelleProposition = '';

            scope.ajouteProposition();

            expect(scope.ajoutValide).toBeFalsy();
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
