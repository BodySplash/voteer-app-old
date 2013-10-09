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

    describe("Étantd donné que le sondage est public", function () {

        beforeEach(function () {
            var desVotes = ['test'];
            votes.query.andReturn(desVotes);
            scope.sondage = { visibility: 'Public', id: 'un id'};
            scope.$emit("SondageChargé");
        });

        it("doit charger les votes", function() {
           expect(votes.query).toHaveBeenCalledWith({id : 'un id'});
        });

        it("doit passer les votes au scope", function() {
            expect(scope.votes).not.toBeUndefined();
            expect(scope.votes[0]).toBe('test');
        });
    });

    describe("Étantd donné que le sondage est privé", function () {

        beforeEach(function () {
            scope.sondage = { visibility: 'Privee', id: 'un id'};
            scope.$emit("SondageChargé");
        });

        it("ne doit pas charger les votes", function() {
            expect(votes.query).not.toHaveBeenCalled();
        });
    });
});