exports.index = function (req, res) {

    res.render('thankyou', {
        titre : 'Thank you for your vote',
        pollId : req.query.pollId
    });

};