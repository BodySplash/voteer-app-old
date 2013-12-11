exports.index = function (req, res) {

    res.render('resultat', {
        titre : 'Poll result - Voteer, group compromise made easy',
        pollId : req.params.id,
        classe : 'resultat'
    });

};