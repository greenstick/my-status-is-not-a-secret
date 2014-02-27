var Submission = require('../models/submission.js');

/**
 *	Database Access API
 **/

//Submit 
exports.submit = function (req, res) {
	var date = new Date();
	//Creating New Submission
	var submission = new Submission({
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
		res.json(submission);
	});
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
	var query = Submission.find({}, 'story name.first location.country location.state location.city s3imgURL cloudfrontURL createdAt');
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
};

//Update Post
exports.approvePosts = function (req, res) {
	var idList = req.param("idList");
	console.log(idList);
	var updated = new Date();
	submission.update();
};

//Hide Post
exports.hidePosts = function (req, res) {
	var idList = req.param("idList");
	var updated = new Date();
	submission.update();
};

exports.showApproved = function (req, res) {

};

exports.showHidden = function (req, res) {

};