exports.index = function (req, res) {

    res.render('sondage', {
            classe: 'sondage',
            titre: 'Voteer, group compromise made easy'
            }
    );

};