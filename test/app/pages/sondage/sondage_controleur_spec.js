"use strict";

describe("Sondage controleur", function () {

    var controleur,
        scope,
        $window = { document: {}},
        SondageRessource = {},
        IdentiteSondage = {id: "12", key: "aa"};

    beforeEach(function () {
        angular.mock.module("pages.sondage");
    });

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        SondageRessource.get = jasmine.createSpy().andReturn({name : "nom"});
        controleur = $controller("SondageControleur", {
            $scope: scope,
            $window: $window,
            IdentiteSondage: IdentiteSondage,
            SondageRessource: SondageRessource
        });
    }));

    it("Doit être défini", function () {
        expect(controleur).not.toBeUndefined();
    });

    it("Doit passer le sondage au scope", function () {
        expect(SondageRessource.get).toHaveBeenCalledWith({id: "12"}, jasmine.any(Function));
        expect(scope.sondage.name).toBe("nom");
    });

    it("Doit dire que les votes ne sont pas affichables si la visibilité est Privée", function() {
        scope.sondage = { visibility: 'Privée'};

        expect(scope.afficheVote()).toBeFalsy();
    });

    it("Doit dire que les votes sont affichables si la visibilité est Public", function() {
        scope.sondage = { visibility: 'Public'};

        expect(scope.afficheVote()).toBeTruthy();
    });

    it("doit donner le nombre de votes", function() {
        scope.$emit("VotesChargés", 3);

        expect(scope.nombreVotes).toBe(3);
    });

    it("Doit dire si le sondage est fermé", function() {
        scope.sondage = { status: 'Ferme'};

        expect(scope.sondageFerme()).toBeTruthy();
    });
});