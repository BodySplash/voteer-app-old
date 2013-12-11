var express = require("express"),
	path = require('path'),
    i18n = require('i18next');


var app = express();

console.log("Configuring app for " + app.get('env') + " environment");

i18n.init({
    ignoreRoutes: ['img/','assets/', 'font/'],
    fallbackLng : 'en'
});

app.configure(function() {
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(i18n.handle);
    app.set('views', path.join(__dirname, '/views'));
	app.set('view engine', 'jade');
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public/'));
    app.use(express.errorHandler());
});

app.configure('development', function() {
	app.use(express.logger('dev'));
    app.locals.apiUrl = 'http://localhost\\\\:8182';
});

app.configure('staging', function() {
   app.locals.apiUrl = 'http://api-itg.voteer.com';
});

app.configure('production', function() {
    app.locals.apiUrl = 'http://api.voteer.com';
});

require('./assets')(app);
require('./routes')(app);

i18n.registerAppHelper(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});