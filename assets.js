module.exports = function (assets) {

    var _ = require("underscore");
    assets.root = __dirname;
    bundleJs('base', [
        '/assets/bower_components/underscore/underscore.js',
        '/assets/bower_components/jquery/jquery.js',
        '/public/bootstrap/js/bootstrap.js',
        '/assets/bower_components/angular/angular.js',
        '/assets/bower_components/angular/angular-resource.js',
        '/assets/bower_components/angular-ui/build/angular-ui.js',
        '/assets/bower_components/uri.js/src/URI.js',
        '/public/app/directives/loading.js'
    ]);

    bundleJs('accueil', [
        '/public/app/sondage/_module.js',
        '/public/app/sondage/sondages_ressource.js',
        '/public/app/pages/accueil/accueil_controleur.js'
    ]);

    bundleJs('admin', [
        '/public/app/sondage/_module.js',
        '/public/app/sondage/sondage_ressource.js',
        '/public/app/sondage/sondage_identite_provider.js',
        '/public/app/proposition/_module.js',
        '/public/app/proposition/propositions_sondage_ressource.js',
        '/public/app/vote/_module.js',
        '/public/app/vote/votes_sondage_ressource.js',
        '/public/app/vote/vote_sondage_ressource.js',
        '/public/app/proposition/proposition_sondage_ressource.js',
        '/public/app/pages/admin/_module.js',
        '/public/app/pages/admin/configuration_sondage_controleur.js',
        '/public/app/pages/admin/propositions_sondage_controleur.js',
        '/public/app/pages/admin/votes_sondage_controleur.js',
        '/public/app/pages/admin/admin_controleur.js'
    ]);

    bundleJs('sondage', [
        '/public/app/directives/disqus.js',
        '/public/app/sondage/_module.js',
        '/public/app/sondage/sondage_ressource.js',
        '/public/app/sondage/sondage_identite_provider.js',
        '/public/app/proposition/_module.js',
        '/public/app/proposition/propositions_sondage_ressource.js',
        '/public/app/vote/_module.js',
        '/public/app/vote/votes_sondage_ressource.js',
        '/public/app/pages/sondage/_module.js',
        '/public/app/pages/sondage/vote_controleur.js',
        '/public/app/pages/sondage/sondage_controleur.js',
    ]);

    bundleJs('resultat', [
        '/public/app/sondage/_module.js',
        '/public/app/sondage/sondage_identite_provider.js',
        '/public/app/classement/_module.js',
        '/public/app/classement/classement_sondage_ressource.js',
        '/public/app/pages/resultat/resultat_controleur.js',
    ]);

    assets.addCss('/public/bootstrap/css/bootstrap.css');
    assets.addCss('/public/css/style.styl');

    function bundleJs(name, files) {
        _.each(files, function (file) {
            assets.addJs(file, name);
        });
    }
};