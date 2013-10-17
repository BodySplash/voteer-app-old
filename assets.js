module.exports = function (app) {

    global.nap = require('nap');

    nap({
        assets: {
            js: {
                base: [
                    '/assets/bower_components/underscore/underscore.js',
                    '/assets/bower_components/jquery/jquery.js',
                    '/public/bootstrap/js/bootstrap.js',
                    '/assets/bower_components/angular/angular.js',
                    '/assets/bower_components/angular/angular-resource.js',
                    '/assets/bower_components/angular-ui/build/angular-ui.js',
                    '/assets/bower_components/uri.js/src/URI.js',
                    '/public/app/directives/_module.js',
                    '/public/app/directives/loading.js',
                    '/public/app/directives/ajaxloader.js'
                ],
                accueil: [
                    '/public/app/sondage/_module.js',
                    '/public/app/sondage/sondages_ressource.js',
                    '/public/app/pages/accueil/accueil_controleur.js'],
                admin: [
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
                ],
                sondage: [
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
                    '/public/app/pages/sondage/votes_sondage_controleur.js',
                    '/public/app/pages/sondage/sondage_controleur.js'
                ],
                resultat: [
                    '/public/app/sondage/_module.js',
                    '/public/app/sondage/sondage_identite_provider.js',
                    '/public/app/classement/_module.js',
                    '/public/app/classement/classement_sondage_ressource.js',
                    '/public/app/pages/resultat/resultat_controleur.js'
                ],
                privateadmin: [
                    '/public/app/sondage/_module.js',
                    '/public/app/sondage/private_sondages_ressource.js',
                    '/public/app/pages/private_admin/_module.js',
                    '/public/app/pages/private_admin/private_admin_controleur.js'
                ]
            },
            css: {
                all: [
                    '/public/css/style.styl',
                    '/public/bootstrap/css/bootstrap_embed.css'
                ]
            }

        }
    });

    if (app.get('env') !== 'development') {
        nap.package();
    }
    ;
}

