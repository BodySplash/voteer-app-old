module.exports = function (assets) {

    var _ = require("underscore");
    assets.root = __dirname;
    bundleJs('base', [
        '/assets/bower_components/underscore/underscore.js',
        '/assets/bower_components/jquery/jquery.js',
        '/public/bootstrap/js/bootstrap.js',
        '/assets/bower_components/angular/angular.js',
        '/assets/bower_components/angular-resource/angular-resource.js'
    ]);

    bundleJs('accueil', [
        '/public/app/sondage/_module.js',
        '/public/app/sondage/sondages_ressource.js',
        '/public/app/pages/accueil/accueil_controleur.js',
    ]);

    bundleJs('admin', [
        '/public/app/sondage/_module.js',
        '/public/app/sondage/sondage_ressource.js',
        '/public/app/pages/admin/admin_controleur.js',
    ]);

    assets.addCss('/public/bootstrap/css/bootstrap.css');
    assets.addCss('/public/css/style.css');

    function bundleJs(name, files) {
        _.each(files, function (file) {
            assets.addJs(file, name);
        });
    }
};