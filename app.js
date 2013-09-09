var express = require("express"),
	path = require('path'),
    BundleUp = require('bundle-up');

var app = express();

console.log("Configuring app for " + app.get('env') + " environment");
BundleUp(app, __dirname + "/assets.js" , {
    staticRoot: __dirname + '/public/',
    staticUrlRoot:'/',
    bundle: app.get("env") === 'production',
    minifyCss: app.get("env") === 'production',
    minifyJs: app.get("env") === 'production'
});

app.configure(function() {
	app.set('views', path.join(__dirname, '/views'));
	app.set('view engine', 'jade');
	app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public/'));


});

app.configure('development', function() {
	app.use(express.logger('dev'));
	app.use(express.errorHandler());
    app.locals.apiUrl = 'http://localhost\\\\:8182';
});

app.configure('production', function() {
    app.use(express.errorHandler());
    app.locals.apiUrl = 'http://api.voteer.com';
});


require('./routes')(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});