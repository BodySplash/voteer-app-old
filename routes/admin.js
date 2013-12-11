exports.index = function (req, res) {

    res.render('admin', {
        classe : 'admin',
        titre : 'Poll administration - Voteer, group compromise made easy'});

};