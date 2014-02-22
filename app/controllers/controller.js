var mongoose = require('mongoose');

	exports.index = function(req, res){
		res.render('', {
	    	title: 'Welcome'
			});
	};

	exports.home = function(req, res){
		res.render('home', {
			title: 'Home'
		});
	};

	exports.about = function(req, res){
		res.render('about', {
			title: 'About'
		});
	};

	exports.whyshare = function(req, res){
		res.render('whyshare', {
			title: 'Why Share?'
		});
	};

	exports.give = function(req, res){
		res.render('give', {
			title: 'Give'
		});
	};

	exports.resources = function(req, res){
		res.render('resources', {
			title: 'Resources'
		});
	};

	exports.shared = function (req, res){
		res.render('shared', {
			title: 'Shared'
		});
	};

	exports.modal = function (req, res) {
		res.render('modal', {
			title: "Submit Story"
		});
	};

	exports.dbTest = function (req, res){
		res.render('test/db-test', {
			title: 'DB Test'
		});
	};