var Submission = require('../models/submission.js'),
	knox = require('knox'),
	fs = require('fs');

/**
 *	Utility Functions
 **/

var decodeBase64Image = function (dataString) {
	var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
	    response = {};
		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}
		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');
		return response;
};

/**
 *	Database Access API
 **/

//Submit Post
exports.submit = function (req, res) {
	//Creating New Submission
	var date = new Date(),
		id = null,
		data = req.param("data"),
		story = data.story,
		first = data.name.first,
		last = data.name.last,
		country = data.location.country,
		state = data.location.state,
		selectedImg = data.images.selected,
		editedImg = data.images.edited;

	//Creating Document
	var submission = new Submission({
		story: story,
		createdAt: date,
		approved: false,
		name: {
			first: first,
			last: last
		},
		location: {
			country: country,
			state: state
		},
		cloudfrontURL: 'feed-images/my-status.png',
	});

	//Saving Submission to DB
	submission.save(function (err, submission, count) {
		if (err) return console.log(err);
		//Photo Variables
		var cloudfrontURL;
			//Image Upload - S3
			if (selectedImg == 'default-image.png') {
				var imageBuffer = decodeBase64Image(editedImg),
					cloudfrontURL = 'feed-images/' + submission._id + '.' + imageBuffer.type.substr(6);
					fs.writeFile(submission._id + "-tempImg", imageBuffer.data, function (err) {
						if (err) return console.log(err);
						//S3 Image Upload Handling
						//Authentication - Deployment Version
						var s3 = knox.createClient({
							key: process.env.AWS_ACCESS_KEY_ID,
							secret: process.env.AWS_SECRET_ACCESS_KEY,
							bucket: process.env.S3_BUCKET_NAME
						});

						//S3 Headers
						var s3Headers = {
							'Content-Type': imageBuffer.type,
							'x-amx-acl': 'public-read'
						};
						//Putting Files to S3
						s3.putFile(submission._id + '-tempImg', cloudfrontURL, s3Headers, function (err, s3res) {
							if (err) return console.log(err);
							s3imgURL = s3res.url;
							//Updating Submission With S3 URL for Image
							var update = Submission.update({_id: submission._id}, {$set: {cloudfrontURL: cloudfrontURL}}, function () {
								update.exec(function (err, updated) {
									if (err) {
										res.json(submission);
										return console.log(error);
									}
									res.json(submission);
									//Removing Temporary Image
									fs.unlink(submission._id + "-tempImg", function (err) {
										if (err) return console.log("Temp Img Deletion Failure");
										console.log("Temp Img Cleared");
									})
								});
							});
						});
					})
			//Selected Image / No Upload
			} else {
				cloudfrontURL = 'feed-images/' + selectedImg;
				var update = Submission.update({_id: submission._id}, {$set: {cloudfrontURL: cloudfrontURL}}, function () {
					update.exec(function (err, updated) {
						if (err) {
							res.json(submission);
							return console.log(err);
						}
						res.json(submission);
					});
				});
			}
	});
};

//Retrieve Stories
exports.retrieve = function (req, res) {
	var skipValue = 16 * (req.param("page") -1),
		query = Submission.find({approved: true}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt', {skip: skipValue, limit: 16, sort: {updatedAt: -1}});
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
};

//Retrieve for Moderation
exports.newPosts = function (req, res) {
	// Submission.remove({}, function () {
	// 	console.log("cleared");
	// })
	var query = Submission.find({updated: null}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt');
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
};

//Update Post
exports.approvePosts = function (req, res) {
	var idList 	= req.param("idList"),
		updated = new Date(),

		update 	= Submission.update({_id: { $in: idList}}, {$set: {approved: true, updatedAt: updated}}, {multi: true}, function () {
			update.exec(function (err, submissions) {
				if (err) return console.log(err)
			})
		}),

		query 	= Submission.find({approved: false}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt', function () {
			query.exec(function (error, submissions) {
				if (error) return console.log(error)
				res.json(submissions);
			})
		});
};

//Hide Post
exports.hidePosts = function (req, res) {
	var idList = req.param("idList"),
		updated = new Date(),
		
		update = Submission.update({_id: { $in: idList}}, {$set: {approved: false, updatedAt: updated}}, {multi: true}, function () {
			update.exec(function (err, submissions) {
				if (err) return console.log(err)
			})
		}),

		query = Submission.find({approved: true}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt', function () {
			query.exec(function (error, submissions) {
				if (error) return console.log(error)
				res.json(submissions);
			})
		});
};

//Show Approved Posts
exports.showApproved = function (req, res) {
	var query = Submission.find({approved: true}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt', function () {
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
	});		
};

//Show Hidden Posts
exports.showHidden = function (req, res) {
	var query = Submission.find({approved: false}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt', function () {
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
	});
};

//Delete Selected Posts
exports.deletePosts = function (req, res) {
	var idList = req.param("idList");
	if (idList.length > 0) {
		var query = Submission.remove({_id: { $in: idList}}, function (err) {
			if (err) return console.log(err);
			res.json({deleted: idList});
		});
	} else {
		res.json({deleted: idList});
	}
};