"use strict";

describe("Votes sondage controleur", function () {

    var scope, controleur, votes;

    beforeEach(function () {
        angular.mock.module("vote.ressource");
        angular.mock.module("pages.sondage");
    });

    beforeEach(inject(['$rootScope', '$controller', function ($rootScope, $controller) {
        scope = $rootScope.$new();
        votes = jasmine.createSpyObj('votes', ['query'])
        controleur = $controller("VotesSondageControleur", {
            $scope: scope,
            VotesSondageRessource: votes
        })
    }]));

    describe("Étant donné que le sondage est public", function () {

        var nombreVotes = 0;

        beforeEach(function () {
            var desVotes = ['test'];
            votes.query.andCallFake(function(options, callback) {
                callback(desVotes);
                return desVotes;
            });
            scope.sondage = { visibility: 'Public', id: 'un id'};
            scope.$on("VotesChargés", function(event, nombre) {
                nombreVotes = nombre;
            })
            scope.$emit("SondageChargé");
        });

        it("doit charger les votes", function() {
           expect(votes.query).toHaveBeenCalledWith({id : 'un id'}, jasmine.any(Function));
        });

        it("doit passer les votes au scope", function() {
            expect(scope.votes).not.toBeUndefined();
            expect(scope.votes[0]).toBe('test');
        });

        it("doit remonter le nombre de votes chargés", function() {
            expect(nombreVotes).toBe(1);
        });
    });

    describe("Étant donné que le sondage est privé", function () {

        beforeEach(function () {
            scope.sondage = { visibility: 'Privee', id: 'un id'};
            scope.$emit("SondageChargé");
        });

        it("ne doit pas charger les votes", function() {
            expect(votes.query).not.toHaveBeenCalled();
        });
    });
});