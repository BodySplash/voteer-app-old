describe("Resultat Controleur", function() {

    var scope, controleur, classement, idClassementUtilise, idSondageUtilise;

    beforeEach(function() {
       module("pages.resultat");
       module("classement.ressource");
       module("sondage.utils");
    });

    beforeEach(inject(function($rootScope, $controller) {
        classement = [{label : "un"}, {label : "deux"}];
        scope = $rootScope.$new();
        controleur =  $controller("ResultatControleur", {
           $scope : scope,
           ClassementSondageRessource : {query : function(params, callback) {
               idClassementUtilise = params.id;
               callback(classement);
               return classement;
           }},
           IdentiteSondage: {id : "unId"},
           SondageRessource: {get: function(params, callback) {
               idSondageUtilise = params.id;
               callback();
               return {};
           }}
        });
    }));

    it("doit charger le sondage", function() {
        expect(idSondageUtilise).toBe("unId");
        expect(scope.sondage).toBeDefined();
        expect(scope.sondageCharge).toBeTruthy();
    });

    it("doit charger les résultats", function() {
       expect(idClassementUtilise).toBe("unId");
       expect(scope.classement).toBe(classement);
    });

    it("doit donner le vainqueur", function() {
       expect(scope.premier).toBe(classement[0]);
    });
});