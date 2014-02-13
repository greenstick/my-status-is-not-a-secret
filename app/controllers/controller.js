var mongoose = require('mongoose');

	exports.index = function(req, res){
		res.render('home/index', {
	    	title: 'Welcome'
			});
	};

	exports.is = function(req, res){
		res.render('is/home', {
			title: 'Home'
		});
	};

	exports.isnot = function(req, res){
		res.render('isnot/home', {
			title: 'Home'
		});
	};

	exports.isAbout = function(req, res){
		res.render('is/about', {
			title: 'About'
		});
	};

	exports.isnotAbout = function(req, res){
		res.render('isnot/about', {
			title: 'About'
		});
	};

	exports.isWhyShare = function(req, res){
		res.render('is/whyshare', {
			title: 'Why Share?'
		});
	};

	exports.isnotWhyShare = function(req, res){
		res.render('isnot/whyshare', {
			title: 'Why Share?'
		});
	};

	exports.isGive = function(req, res){
		res.render('is/give', {
			title: 'Give'
		});
	};

	exports.isnotGive = function(req, res){
		res.render('isnot/give', {
			title: 'Give'
		});
	};

	exports.isResources = function(req, res){
		res.render('is/resources', {
			title: 'Resources'
		});
	};

	exports.isnotResources = function(req, res){
		res.render('isnot/resources', {
			title: 'Resources'
		});
	};