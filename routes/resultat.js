exports.index = function (req, res) {

    res.render('resultat', {
        titre : 'Poll result',
        pollId : req.params.id
    });

};