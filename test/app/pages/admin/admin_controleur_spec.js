"use strict";

describe("Admin controleur", function () {

    var controleur, scope,
        location,
        Sondage = jasmine.createSpyObj("Sondage", ['get']);

    beforeEach(function () {
        angular.mock.module("sondage.ressource")
        angular.mock.module("pages.admin");
    });

    beforeEach(inject(function ($controller, $rootScope, $location) {
        scope = $rootScope.$new();
        location = $location;
        controleur = $controller("AdminControleur", {
            $scope: scope,
            SondageRessource: Sondage,
            $location: location
        });
    }));

    it("doit être défini", function () {
        expect(controleur).not.toBeUndefined();
    });


    describe("Étant donné une url correcte", function () {
        beforeEach(inject(

            function ($controller, $rootScope, $location) {
                scope = $rootScope.$new();
                location = $location;
                location.path("/polls/unId/admin").search({key:"laKey"}).replace();
                Sondage.get.andReturn({});
                controleur = $controller("AdminControleur", {
                    $scope: scope,
                    SondageRessource: Sondage,
                    $location: location
                });
            }));

        it("doit récupérer le sondage en fonction des paramètres de l'url", function () {
            expect(Sondage.get).toHaveBeenCalledWith({ id: 'unId', key: 'laKey'});
        });

        it("doit donnel le sondage au scope", function () {
            expect(scope.sondage).not.toBeUndefined();
        });
    });


});