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
	req.param("page")
	var query = Submission.find({}, 'story name.first location.country location.state location.city s3imgURL cloudfrontURL createdAt').limit(10);
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
};