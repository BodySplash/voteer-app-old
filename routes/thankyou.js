var i18n = require('i18next');

exports.index = function (req, res) {

    res.render('thankyou', {
        titre : i18n.t("app.title.thankYou") + ' - ' + i18n.t("app.title.global"),
        pollId : req.query.pollId
    });

};