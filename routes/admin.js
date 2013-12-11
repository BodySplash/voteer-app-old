var i18n = require('i18next');

exports.index = function (req, res) {

    res.render('admin', {
        classe : 'admin',
        titre : i18n.t("app.title.admin") + ' - ' + i18n.t("app.title.global")});

};