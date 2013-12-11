exports.index = function (req, res) {

    res.render('help', {
        titre : 'Help - Voteer, group compromise made easy',
        classe : 'aide'
    });

};