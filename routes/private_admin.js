exports.index = function (req, res) {

    res.render('privateadmin', {
        classe : 'private-admin',
        titre : 'Private polls administration - Voteer, group compromise made easy'});

};