"use strict";

describe("Configuration sondage controleur", function() {


    var controleur, scope,
        Sondage = jasmine.createSpyObj("Sondage", ['update']);

    beforeEach(function () {
        angular.mock.module("sondage.ressource")
        angular.mock.module("pages.admin");
    });

    beforeEach(inject(function ($controller, $rootScope, $location) {
        scope = $rootScope.$new();
        controleur = $controller("ConfigurationSondageControleur", {
            $scope: scope,
            SondageRessource: Sondage
        });
    }));

    it("doit dire que le sondage est chargé", function() {
       scope.$emit("SondageChargé")

        expect(scope.configurationChargee).toBeTruthy()
    });

    it("doit être défini", function() {
       expect(controleur).not.toBeUndefined();
    });

    it("peut changer la visibilité", function() {
        scope.sondage = {
            visibility:'Privee',
            adminKey:'laKey'
        };

        scope.changeVisibilite('Public');

        expect(scope.sondage.visibility).toBe('Public');
        expect(Sondage.update).toHaveBeenCalledWith({key : 'laKey'}, scope.sondage);
    });

    it("peut changer les commentaires", function() {
        scope.sondage = {
            withComments: false,
            adminKey:'laKey'
        };

        scope.changeCommentaires(true);

        expect(scope.sondage.withComments).toBeTruthy();
        expect(Sondage.update).toHaveBeenCalledWith({key : 'laKey'}, scope.sondage);
    });
});