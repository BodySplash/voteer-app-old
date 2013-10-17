var indexRoute = require("./accueil"),
    adminRoute = require("./admin"),
    privateAdminRoute = require("./private_admin"),
    pollRoute = require("./sondage"),
    resultatRoute = require("./resultat"),
    help = require("./help"),
    thankyouRoute = require("./thankyou"),
    ancienAdminRoute = require("./ancienadmin");

module.exports = function(app) {
    app.get('/', indexRoute.index);
    app.get('/polls/:id', pollRoute.index);
    app.get('/polls/:id/admin', adminRoute.index);
    app.get('/polls/:id/result', resultatRoute.index);
    app.get('/thankyou', thankyouRoute.index);
    app.get('/help', help.index);
    app.get('/admin/polls/:key', ancienAdminRoute.index);
    app.get('/private/polls', privateAdminRoute.index);
}