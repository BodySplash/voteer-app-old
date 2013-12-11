exports.index = function (req, res) {

    res.render('thankyou', {
        titre : 'Thank you for your vote - Voteer, group compromise made easy',
        pollId : req.query.pollId
    });

};