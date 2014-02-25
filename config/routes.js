module.exports = function (app) {

	//Controller
	var controller = require('../app/controllers/controller');
	var api = require('../app/controllers/api');
		//index route
		app.get('/', controller.index);
		//home route
		app.get('/home', controller.home);
		//about route
		app.get('/about', controller.about);
		//whyshare route
		app.get('/whyshare', controller.whyshare);
		//give route
		app.get('/give', controller.give);
		//resources route
		app.get('/resources', controller.resources);
		//shared route
		app.get('/shared', controller.shared);
		// modal route
		app.get('/modal', controller.modal);
		// modal - submit route
		app.post('/submit', api.submit);
		// feed - retrieve route
		app.get('/retrieve', api.retrieve);
		// test - DB Test
		app.get('/test/db-test', controller.dbTest);
};
