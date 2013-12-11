describe("Resultat Controleur", function () {

    var scope, controleur, classement, idClassementUtilise, idSondageUtilise;

    beforeEach(function () {
        module("pages.resultat");
        module("classement.ressource");
        module("sondage.utils");
    });

    beforeEach(inject(function ($rootScope, $controller) {
        classement = [
            {label: "un"},
            {label: "deux"}
        ];
        scope = $rootScope.$new();
        controleur = $controller("ResultatControleur", {
            $scope: scope,
            ClassementSondageRessource: {query: function (params, callback) {
                idClassementUtilise = params.id;
                callback(classement);
                return classement;
            }},
            IdentiteSondage: {id: "unId"},
            SondageRessource: {get: function (params, callback) {
                idSondageUtilise = params.id;
                callback();
                return {};
            }}
        });
    }));

    it("doit charger le sondage", function () {
        expect(idSondageUtilise).toBe("unId");
        expect(scope.sondage).toBeDefined();
        expect(scope.sondageCharge).toBeTruthy();
    });

    it("doit charger les résultats", function () {
        expect(idClassementUtilise).toBe("unId");
        expect(scope.classement).toBe(classement);
    });

    it("doit donner le vainqueur", function () {
        expect(scope.premier).toBe(classement[0]);
    });

    it("doit pouvoir dire si égalité", function () {
        var resultat = {propositions: [
            {},
            {}
        ]};

        var egalite = scope.egalite(resultat);

        expect(egalite).toBeTruthy();
    });

    it("doit pouvoir extraire la première proposition", function () {
        var resultat = {propositions: [
            {label: "test"}
        ]};

        var label = scope.labelUnique(resultat);

        expect(label).toBe("test");
    });
});