"use strict";

describe("Vote controleur", function () {

    var controleur,
        scope,
        Propositions = jasmine.createSpyObj("Propositions", ['query']),
        Votes = jasmine.createSpyObj("Votes", ['save']);

    beforeEach(function () {
        angular.mock.module("proposition.ressource")
        angular.mock.module("pages.sondage");
    });

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controleur = $controller("VoteControleur", {
            $scope: scope,
            PropositionsSondageRessource: Propositions,
            VotesSondageRessource: Votes
        });
    }));

    it("Doit être défini", function () {
        expect(controleur).not.toBeUndefined();
    });


    it("Doit charger les propositions", function () {
        scope.sondage = {
            id: "unId"
        };

        scope.$broadcast("SondageChargé");

        expect(Propositions.query).toHaveBeenCalledWith({id: "unId"}, jasmine.any(Function));
    });

    it("Doit passer les propositions au scope", function () {
        scope.sondage = {
            id: "unId"
        };
        var propositions = [{label: "test"}];
        Propositions.query.andReturn(propositions)

        scope.$broadcast("SondageChargé");

        expect(scope.propositions).toEqual(propositions);
    });

    it("Doit dire que les propositions sont chargées", function() {
        scope.sondage = {
            id: "unId"
        };
        Propositions.query.andCallFake(function(options, callback) {
           callback();
        });

        scope.$broadcast("SondageChargé");

        expect(scope.propositionsChargees).toBe(true);
    });

    it("Doit dire qu'il est possible de voter", function() {
        scope.sondage = {
            id: "unId"
        };
        var propositions = [{label: "test"}];
        Propositions.query.andReturn(propositions)

        scope.$broadcast("SondageChargé");

        expect(scope.votePossible()).toBeTruthy();
    });

    describe("Étant donné une liste de proposition", function () {

        var listePropositions = [
            {label: 'un'},
            {label: 'deux'},
            {label: 'trois'}
        ];

        beforeEach(function () {
            scope.sondage = {
                id: "unId"
            };
            Propositions.query.andReturn(listePropositions);
            scope.$broadcast("SondageChargé");
        });

        it("doit être possible de choisir une proposition", function () {
            scope.votePour(listePropositions[0]);

            expect(scope.propositions).not.toContain(listePropositions[0]);
            expect(scope.vote.proposals).toContain(listePropositions[0]);
        });

        describe("Étant donné un vote", function () {
            beforeEach(function () {
                scope.votePour(listePropositions[0]);
                scope.votePour(listePropositions[1]);
                scope.votePour(listePropositions[2]);
            });

            it("doit être possible d'annuler un choix", function () {
                scope.annuleVotePour(listePropositions[0]);

                expect(scope.propositions).toContain(listePropositions[0]);
                expect(scope.vote.proposals).not.toContain(listePropositions[0]);
            });

            it("doit être possible de remonter un choix", function () {
                scope.monte(listePropositions[2]);

                expect(scope.vote.proposals[1]).toBe(listePropositions[2]);
            });

            it("doit être possible de descendre un choix", function () {
                scope.descend(listePropositions[1]);

                expect(scope.vote.proposals[2]).toBe(listePropositions[1]);
            });

            it("doit être possible de valider son vote", function () {
                scope.valideVote();

                expect(Votes.save).toHaveBeenCalledWith({id : "unId"}, scope.vote, jasmine.any(Function), jasmine.any(Function));
            });

            it("doit désactiver le bouton de vote", function() {
                scope.valideVote();

                expect(scope.creation).toBeTruthy();
            });

            it("Doit être possible de continuer a voter", function() {
               expect(scope.votePossible()).toBeTruthy();
            });
        });
    });


});
