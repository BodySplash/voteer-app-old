exports.index = function (req, res) {

    res.render('admin', {
        classe : 'admin',
        titre : 'Poll administration'});

};