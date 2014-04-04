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
		// whyknow route
		app.get('/whyknow', controller.whyknow);
		// give route
		app.get('/give', controller.give);
		// resources route
		app.get('/resources', controller.resources);
		// shared route
		app.get('/shared', controller.shared);
		// interviews route
		app.get('/interviews', controller.interviews);
		// modal route
		app.get('/modal', controller.modal);
		// modal submit
		app.post('/submit', api.submit);
		// showFeatured
		app.get('/showFeatured', api.showFeatured);
		// feed - retrieve route
		app.get('/retrieve', api.retrieve);
		// sitemap.xml
		app.get('/sitemap.xml', controller.sitemap);
		// robots.txt
		app.get('/robots.txt', controller.robots);
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
		// moderation - featurePost
		app.get('/featurePost', passport.authenticate('basic', {session: false}), api.featurePost);
	};
