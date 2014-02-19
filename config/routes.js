module.exports = function(app){

	//Controller
	var controller = require('../app/controllers/controller');
		//index route
		app.get('/', controller.index);
		//is - home route
		app.get('/I/home', controller.is);
		// isnot - home route
		app.get('/l/home', controller.isnot);
		// is - about route
		app.get('/I/about', controller.isAbout);
		// isnot - about route
		app.get('/l/about', controller.isnotAbout);
		// is - why share route
		app.get('/I/whyshare', controller.isWhyShare);
		// isnot - why share route
		app.get('/l/whyshare', controller.isnotWhyShare);
		// is - give route
		app.get('/I/give', controller.isGive);
		// isnot - give route
		app.get('/l/give', controller.isnotGive);
		// is - resources route
		app.get('/I/resources', controller.isResources);
		// isnot - about route
		app.get('/l/resources', controller.isnotResources);
		// is - shared route
		app.get('/I/shared', controller.isShared);
		//isnot - shared route
		app.get('/l/shared', controller.isnotShared);
		//404 
		app.get('**', controller.notfound);
};
