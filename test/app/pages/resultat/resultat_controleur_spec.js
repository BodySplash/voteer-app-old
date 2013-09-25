describe("Resultat Controleur", function() {

    var scope, controleur, classement, idUtilise;

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
               idUtilise = params.id;
               callback(classement);
               return classement;
           }},
           IdentiteSondage: {id : "unId"}
        });
    }));

    it("doit charger les résultats", function() {
       expect(idUtilise).toBe("unId");
       expect(scope.classement).toBe(classement);
    });

    it("doit donner le vainqueur", function() {
       expect(scope.premier).toBe(classement[0]);
    });
});