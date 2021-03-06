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

	exports.whyknow = function(req, res){
		res.render('whyknow', {
			title: 'Why Know?'
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

	exports.interviews = function (req, res){
		res.render('interviews', {
			title: 'Interviews'
		});
	};

	exports.modal = function (req, res) {
		res.render('modal', {
			title: "Submit Story"
		});
	};

	exports.moderation = function (req, res) {
		res.render('moderation', {
			title: 'Moderation Queue'
		});
	};

	exports.sitemap = function (req, res) {
		res.redirect('http://d1cllk76e9bo1o.cloudfront.net/sitemap.xml');
	};

	exports.robots = function (req, res) {
		res.redirect('http://d1cllk76e9bo1o.cloudfront.net/robots.txt');
	};