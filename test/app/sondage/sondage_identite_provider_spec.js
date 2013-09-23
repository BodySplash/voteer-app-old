describe('Sondage Identite Provider', function() {

    beforeEach(function() {
       angular.mock.module("sondage.utils");
    });

    beforeEach(function() {
        module(function($provide) {
            $provide.value("$window", {
                location : "http://test.com/polls/unId/admin?key=laKey"
            });
        });
    });

    it("Doit retourner l'identité du songage", inject(function(IdentiteSondage) {
        expect(IdentiteSondage.id).toBe("unId");
        expect(IdentiteSondage.key).toBe("laKey");
    }));

});