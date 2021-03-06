var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  config = require('./config/config'),
  passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy,
  knox = require('knox'),
  newrelic = require('newrelic');

//Connect to DB
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

//Access Models
var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

//Moderation Page Authentication
//Remove Development User/Pass on Deployment
passport.use(new BasicStrategy(
	function (username, password, done) {
		if (username.valueOf() === process.env.MOD_USERNAME && password.valueOf() === process.env.MOD_PASSWORD)
			return done(null, true);
		else
			return done(null, false);
	})
);

var app = express();

require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(process.env.PORT || config.port);
