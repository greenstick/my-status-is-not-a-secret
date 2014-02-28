module.exports = function (app) {

	//Controller
	var controller = require('../app/controllers/controller'),
		api = require('../app/controllers/api'),
		passport = require('passport');
		// index route
		app.get('/', controller.index);
		// home route
		app.get('/home', controller.home);
		// about route
		app.get('/about', controller.about);
		// whyshare route
		app.get('/whyshare', controller.whyshare);
		// give route
		app.get('/give', controller.give);
		// resources route
		app.get('/resources', controller.resources);
		// shared route
		app.get('/shared', controller.shared);
		// moderation route
		app.get('/moderation', passport.authenticate('basic', {session: false}), controller.moderation);
		// modal route
		app.get('/modal', controller.modal);
		// modal submit
		app.post('/submit', api.submit);
		// moderation - retrieve route
		app.get('/newposts', api.newPosts);
		// moderation - approvePosts
		app.get('/approvePosts', api.approvePosts);
		// moderation - hidePosts
		app.get('/hidePosts', api.hidePosts);
		// moderation - showApproved
		app.get('/showApproved', api.showApproved);
		// moderation - showHidden
		app.get('/showHidden', api.showHidden);
		// feed - retrieve route
		app.get('/retrieve', api.retrieve);
		// test - DB Test
		app.get('/test/db-test', controller.dbTest);
};
