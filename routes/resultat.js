var i18n = require('i18next');

exports.index = function (req, res) {

    res.render('resultat', {
        titre : i18n.t("app.title.pollResult") + ' - ' + i18n.t("app.title.global"),
        pollId : req.params.id,
        classe : 'resultat'
    });

};