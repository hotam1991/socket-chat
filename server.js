//Requiring Modules
var express = require('express');
var socketIo = require('socket.io');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var path = require('path');
var hbs = require('express-handlebars');
var io = require('socket.io');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config/config.json')

//Call The express() function And Puts New Application Into app Variable
var app = exports.app = express();

//Set view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname : 'hbs', defaultLayout: 'layout', layoutsDir: __dirname+'/views/layouts'}));
app.set('view engine', 'hbs');

//To Use Static Files On The Server
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(expressValidator());
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root    = namespace.shift()
		, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg   : msg,
			value : value
		};
	}
}));
app.use(cookieParser());
app.use(session({
	secret: "fd34s@!@dfa453f3DF#$D&W",
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false }
}));

//Listening The App on Specific Port
var server = app.listen(3333, function() {
	console.log('Listening your request on localhost:3333');
});

//Calling routes.js
var io = require('socket.io').listen(server);
require('./sockets.js')(app, io);
require('./routes')(app, io);
