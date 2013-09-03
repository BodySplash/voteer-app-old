exports.index = function (req, res) {

	res.render('index', {
        classe : 'accueil',
        titre : 'Voteer, group compromise made easy'});

};