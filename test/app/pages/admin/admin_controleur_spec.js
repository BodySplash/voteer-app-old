"use strict";

describe("Admin controleur", function () {

    var controleur, scope,
        Sondage = jasmine.createSpyObj("Sondage", ['get']);

    beforeEach(function () {
        angular.mock.module("sondage.ressource");
        angular.mock.module("sondage.utils");
        angular.mock.module("pages.admin");
    });

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controleur = $controller("AdminControleur", {
            $scope: scope,
            SondageRessource: Sondage,
            $window: {location : ""}
        });
    }));

    it("doit être défini", function () {
        expect(controleur).not.toBeUndefined();
    });

    it("doit dire si l'ajout de proposition est possible", function() {
       expect(scope.ajoutPropositionPossible).toBeTruthy();
    });

    describe("Etant donné que le sondage est fermé", function() {
        it("Doit demander de ne pas permettre d'ajouter ou supprimer des propositions", function() {
            scope.sondage = {status: "Ferme"};

            expect(scope.ajoutPropositionPossible()).toBeFalsy();
        });
    });

    describe("Etant donné que le controleur de vote signale des votes", function() {

        beforeEach(inject(function($rootScope) {
           scope.sondage = {status: "Ouvert"};
           $rootScope.$broadcast("VotesExistent");
        }));

        it("Doit demander de ne pas permettre d'ajouter ou supprimer des propositions", function() {
            expect(scope.ajoutPropositionPossible()).toBeFalsy();
        });
    });

    describe("Etant donné que le controleur de vote signale qu'il n'y a plus de vote", function() {

        beforeEach(inject(function($rootScope) {
            scope.sondage = {status: "Ouvert"};
            $rootScope.$broadcast("PlusDeVote");
        }));

        it("Doit demander de  permettre d'ajouter ou supprimer des propositions", function() {
            expect(scope.ajoutPropositionPossible()).toBeTruthy();
        });
    });


    describe("Étant donné une url correcte", function () {

        var callbackSucces;

        beforeEach(inject(
            function ($controller, $rootScope) {
                scope = $rootScope.$new();
                Sondage.get.andCallFake(function(query, callback) {
                    callbackSucces = callback;
                    return {};
                });
                controleur = $controller("AdminControleur", {
                    $scope: scope,
                    SondageRessource: Sondage,
                    IdentiteSondage : {
                    id : "unId",
                        key : "laKey"
                }
                });
            }));

        it("doit récupérer le sondage en fonction des paramètres de l'url", function () {
            expect(Sondage.get).toHaveBeenCalledWith({ id: 'unId', key: 'laKey'}, jasmine.any(Function));
        });

        it("doit donner le sondage au scope", function () {
            expect(scope.sondage).not.toBeUndefined();
        });

        it("doit propager un évènement après le chargement du sondage", function() {
            spyOn(scope, "$broadcast");

            callbackSucces();

            expect(scope.$broadcast).toHaveBeenCalledWith("SondageChargé");
        });
    });
});