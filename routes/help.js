var i18n = require('i18next');

exports.index = function (req, res) {

    res.render('help', {
        titre : i18n.t("app.title.help") + ' - ' + i18n.t("app.title.global"),
        classe : 'aide'
    });

};