"use strict";

describe('Accueil Controleur', function () {

    var controleur, scope, Sondages = jasmine.createSpyObj("Sondages", ['save']);

    beforeEach(function () {
        angular.mock.module("sondage.ressource")
        angular.mock.module("pages.accueil");

    });

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controleur = $controller("AccueilControleur", {
            $scope: scope,
            SondagesRessource : Sondages
        });
    }));

    it("doit être défini", function () {
        expect(controleur).not.toBeUndefined();
    });

    it("doit créer le modèle", function() {
        expect(scope.poll).not.toBeUndefined();
    });

    it("doit pouvoir créer le sondage", function() {
        scope.creeSondage();

        expect(Sondages.save).toHaveBeenCalledWith(scope.poll, jasmine.any(Function));
    });

    it("doit pouvoir rediriger après création", inject(function($window) {
       Sondages.save.andCallFake(function(poll, callback) {
           callback({id : "unId", adminKey : "uneAdminKey"})
       });

        //scope.creeSondage();

        // à faire passer
        //expect($window.location).toBe("/polls/unId/admin?key=uneAdminKey")
    }));
});
