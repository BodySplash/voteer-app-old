"use strict";

describe("Vote controleur", function () {

    var controleur, scope, Propositions = jasmine.createSpyObj("Propositions", ['query']);

    beforeEach(function () {
        angular.mock.module("proposition.ressource")
        angular.mock.module("pages.sondage");
    });

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controleur = $controller("VoteControleur", {
            $scope: scope,
            PropositionsSondageRessource : Propositions
        });
    }));

    it("Doit être défini", function() {
        expect(controleur).not.toBeUndefined();
    });


    it("Doit charger les propositions", function() {
        scope.sondage = {
            id : "unId"
        };

        scope.$broadcast("SondageChargé");

        expect(Propositions.query).toHaveBeenCalledWith({id : "unId"});
    });

    it("Doit passer les propositions au scope", function() {
        scope.sondage = {
            id : "unId"
        };
        var propositions = {label: "test"};
        Propositions.query.andReturn(propositions)

        scope.$broadcast("SondageChargé");

        expect(scope.propositions).toBe(propositions);
    });
} );