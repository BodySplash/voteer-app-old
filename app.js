var express = require("express"),
	routes = require("./routes"),
	path = require('path'),
    BundleUp = require('bundle-up');

var app = express();


BundleUp(app, __dirname + "/assets.js" , {
    staticRoot: __dirname + '/public/',
    staticUrlRoot:'/',
    bundle: false,
    minifyCss: false,
    minifyJs: false
});

app.configure(function() {
	app.set('views', path.join(__dirname, '/views'));
	app.set('view engine', 'jade');
	app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public/'));
    app.locals.apiUrl = 'http://localhost\\\\:8182';

});

app.configure('development', function() {
	app.use(express.logger('dev'));
	app.use(express.errorHandler());
});


app.get('/', routes.index);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});