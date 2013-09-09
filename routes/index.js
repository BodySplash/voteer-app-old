var indexRoute = require("./accueil"),
    adminRoute = require("./admin"),
    pollRoute = require("./sondage");

module.exports = function(app) {
    app.get('/', indexRoute.index);
    app.get('/polls/:id', pollRoute.index);
    app.get('/polls/:id/admin', adminRoute.index);
}