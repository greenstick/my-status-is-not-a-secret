module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);
	//is route
	var is = require('../app/controllers/is');
	app.get('/is', is.is);
	// // isnot route
	var isnot = require('../app/controllers/isnot');
	app.get('/isnot', isnot.isnot);
};
