var mongoose = require('mongoose'),
	Article = mongoose.model('Article');

	exports.index = function(req, res){
		Article.find(function(err, articles){
			if(err) throw new Error(err);
			res.render('home/index', {
		    	title: 'Generator-Express MVC',
		    	articles: articles
	  		});
		});
	};

	exports.is = function(req, res){
		Article.find(function(err, articles){
	    	if(err) throw new Error(err);
	    	res.render('is/home', {
	    		title: 'Generator-Express MVC',
	    		articles: articles
	    	});
	  	});
	};

	exports.isnot = function(req, res){
		Article.find(function(err, articles){
		if(err) throw new Error(err);
			res.render('isnot/home', {
				title: 'Generator-Express MVC',
				articles: articles
			});
		});
	};

	exports.isAbout = function(req, res){
		Article.find(function(err, articles){
			if(err) throw new Error(err);
			res.render('is/about', {
				title: 'Generator-Express MVC',
				articles: articles
			});
		});
	};

	exports.isnotAbout = function(req, res){
		Article.find(function(err, articles){
			if(err) throw new Error(err);
			res.render('isnot/about', {
				title: 'Generator-Express MVC',
				articles: articles
			});
		});
	};

	exports.isWhyShare = function(req, res){
		Article.find(function(err, articles){
			if(err) throw new Error(err);
			res.render('is/whyshare', {
				title: 'Generator-Express MVC',
				articles: articles
			});
		});
	};

	exports.isnotWhyShare = function(req, res){
		Article.find(function(err, articles){
			if(err) throw new Error(err);
			res.render('isnot/whyshare', {
				title: 'Generator-Express MVC',
				articles: articles
			});
		});
	};

	exports.isGive = function(req, res){
		Article.find(function(err, articles){
			if(err) throw new Error(err);
			res.render('is/give', {
				title: 'Generator-Express MVC',
				articles: articles
			});
		});
	};

	exports.isnotGive = function(req, res){
		Article.find(function(err, articles){
			if(err) throw new Error(err);
			res.render('isnot/give', {
				title: 'Generator-Express MVC',
				articles: articles
			});
		});
	};

	exports.isResources = function(req, res){
		Article.find(function(err, articles){
			if(err) throw new Error(err);
			res.render('is/resources', {
				title: 'Generator-Express MVC',
				articles: articles
			});
		});
	};

	exports.isnotResources = function(req, res){
		Article.find(function(err, articles){
			if(err) throw new Error(err);
			res.render('isnot/resources', {
				title: 'Generator-Express MVC',
				articles: articles
			});
		});
	};