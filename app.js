var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  config = require('./config/config'),
  passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy,
  knox = require('knox');

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
		if (username.valueOf() === process.env.MOD_USERNAME || username.valueOf() == 'test' && password.valueOf() === process.env.MOD_PASSWORD || password.valueOf() == 'pass')
			return done(null, true);
		else
			return done(null, false);
	})
)

//S3 Image Upload Handling
//Development Version
var s3 = knox.createClient({
	key: 'AKIAIDSMNL7XAYRZ6VNA',
	secret: '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',
	bucket: 'aids-life-cycle'
});

//S3 Image Upload Handling
//Deployment Version
// var s3 = knox.createClient({
// 	key: process.env.AWS_ACCESS_KEY_ID,
// 	secret: process.env.AWS_SECRET_ACCESS_KEY,
// 	bucket: process.env.S3_BUCKET_NAME
// });

var app = express();

require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(process.env.PORT || config.port);
