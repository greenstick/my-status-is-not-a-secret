var Submission = require('../models/submission.js'),
	knox = require('knox');

/**
 *	Database Access API
 **/

//Submit 
exports.submit = function (req, res) {
		//Creating New Submission
		var date = new Date(),
			id = null,
			submission = new Submission({
				story: req.param("story"),
				date: date,
				approved: false,
				name: {
					first: req.param("name")
				},
				location: {
					country: req.param("country"),
					state: req.param("state")
				}
			});

		//Saving Submission to DB
		submission.save(function (error, submission, count) {
			if (error) return console.log(error)
			id = submission._id;
			res.json(submission);
		});

	// //Photo Variables
	// var photo = req.files.image;
	// var s3response = null;
	// var s3 = knox.createClient({
	// 	key: 'AKIAIDSMNL7XAYRZ6VNA',
	// 	secret: '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',
	// 	bucket: 'aids-life-cycle'
	// });
	// var s3Headers = {
	// 	'Content-Type': photo.type,
	// 	'x-amx-acl': 'public-read'
	// };

	// //Saving File to S3 and Retrieving 
	// s3.putFile(photo.path, photo.name, s3Headers, function (err, s3res) {
	// 	if (err) return console.log(err);
	// 	s3imgURL = s3res.url;
	// 	console.log(s3imgURL);
	// });
	// res.json(submission);
};

//Retrieve Stories
exports.retrieve = function (req, res) {
	var skipValue = 16 * (req.param("page") -1);
	var query = Submission.find({}, 'story name.first location.country location.state location.city s3imgURL cloudfrontURL createdAt', {skip: skipValue, limit: 16});
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
};

//Retrieve for Moderation
exports.newPosts = function (req, res) {
	var query = Submission.find({updated: null}, 'story name.first location.country location.state location.city s3imgURL cloudfrontURL createdAt');
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
};

//Update Post
exports.approvePosts = function (req, res) {
	var idList = req.param("idList");
	var updated = new Date();
	var update = Submission.update({_id: { $in: idList}}, {$set: {approved: true, updated: updated}});
		update.exec(function (error, submissions) {
			if (error) return console.log(error)
		})
	var query = Submission.find({approved: false}, 'story name.first location.country location.state location.city s3imgURL cloudfrontURL createdAt');
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			console.log(submissions)
			res.json(submissions);
		})
};

//Hide Post
exports.hidePosts = function (req, res) {
	var idList = req.param("idList");
	var updated = new Date();
	var update = Submission.update({_id: { $in: idList}}, {$set: {approved: false, updated: updated}});
		update.exec(function (error, submissions) {
			if (error) return console.log(error)
		})
	var query = Submission.find({approved: true}, 'story name.first location.country location.state location.city s3imgURL cloudfrontURL createdAt');
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			console.log(submissions)
			res.json(submissions);
		})
};

exports.showApproved = function (req, res) {
	var query = Submission.find({approved: true}, 'story name.first location.country location.state location.city s3imgURL cloudfrontURL createdAt');
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			console.log(submissions)
			res.json(submissions);
		})
};

exports.showHidden = function (req, res) {
	var query = Submission.find({approved: false}, 'story name.first location.country location.state location.city s3imgURL cloudfrontURL createdAt');
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			console.log(submissions)
			res.json(submissions);
		})
};