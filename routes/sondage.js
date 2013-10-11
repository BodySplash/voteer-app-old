exports.index = function (req, res) {

    res.render('sondage', {
            classe: 'sondage',
            titre: 'Participate to a poll'
            }
    );

};