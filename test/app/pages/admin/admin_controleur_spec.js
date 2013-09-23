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