var express = require('express'),
    passport = require('passport'),
    passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy;

//Moderation Page Authentication
passport.use(new BasicStrategy(
    function (username, password, done) {
        if (username.valueOf() === process.env.MOD_USERNAME || username.valueOf() == 'test' && password.valueOf() === process.env.MOD_PASSWORD || password.valueOf() == 'pass')
            return done(null, true);
        else
            return done(null, false);
    }))

module.exports = function(app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');
    app.use(express.favicon(config.root + '/public/img/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.multipart());
    app.use(express.methodOverride());
    app.use(passport.initialize());
    app.use(app.router);
    app.use(function(req, res) {
      res.status(404).render('404', { title: '404' });
    });
  });
};
