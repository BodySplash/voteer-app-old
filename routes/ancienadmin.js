exports.index = function (req, res) {

    res.render('ancienadmin', {
        classe : 'ancienadmin',
        key : req.params.key,
        titre : 'Admin page has moved'});

};