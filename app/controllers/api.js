var Submission = require('../models/submission.js');

exports.submit = function (req, res) {
	//Creating New Submission
	var submission = new Submission({
			story: req.param("story"),
			name: {
				first: req.param("name")
			},
			location: {
				country: req.param("country"),
				state: req.param("state")
			}
	});
	//Saving Submission to DB
	submission.save(function (err, submission, count) {
		console.log(submission)
		res.json(submission);
	});
}
exports.retrieve = function (req, res) {

};