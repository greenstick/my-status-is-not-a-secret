module.exports = function (app) {

	//Controller
	var controller = require('../app/controllers/controller'),
		api = require('../app/controllers/api'),
		passport = require('passport');
		// index route
		app.get('/', passport.authenticate('basic', {session: false}), controller.index);
		// home route
		app.get('/home', passport.authenticate('basic', {session: false}), controller.home);
		// about route
		app.get('/about', passport.authenticate('basic', {session: false}), controller.about);
		// whyknow route
		app.get('/whyknow', passport.authenticate('basic', {session: false}), controller.whyknow);
		// give route
		app.get('/give', passport.authenticate('basic', {session: false}), controller.give);
		// resources route
		app.get('/resources', passport.authenticate('basic', {session: false}), controller.resources);
		// shared route
		app.get('/shared', passport.authenticate('basic', {session: false}), controller.shared);
		// modal route
		app.get('/modal', passport.authenticate('basic', {session: false}), controller.modal);
		// modal submit
		app.post('/submit', passport.authenticate('basic', {session: false}), api.submit);
		// moderation route
		app.get('/moderation', passport.authenticate('basic', {session: false}), controller.moderation);
		// moderation - retrieve route
		app.get('/newposts', passport.authenticate('basic', {session: false}), api.newPosts);
		// moderation - approvePosts
		app.get('/approvePosts', passport.authenticate('basic', {session: false}), api.approvePosts);
		// moderation - hidePosts
		app.get('/hidePosts', passport.authenticate('basic', {session: false}), api.hidePosts);
		// moderation - deletePosts
		app.get('/deletePosts', passport.authenticate('basic', {session: false}), api.deletePosts);
		// moderation - showApproved
		app.get('/showApproved', passport.authenticate('basic', {session: false}), api.showApproved);
		// moderation - showHidden
		app.get('/showHidden', passport.authenticate('basic', {session: false}), api.showHidden);
		// feed - retrieve route
		app.get('/retrieve', passport.authenticate('basic', {session: false}), api.retrieve);
};
