var Submission = require('../models/submission.js'),
	knox = require('knox'),
	gm = require('gm'),
	img = require('imagemagick');

/**
 *	Database Access API
 **/

//Submit 
exports.submit = function (req, res) {
	//Creating New Submission
	var date = new Date(),
		id = null,
		story = req.param("story"),
		first = req.param("first"),
		last = req.param("last"),
		country = req.param("country"),
		state = req.param("state");

		//Basic Name Formatting for Design
		if (first == '' && last == '') {
			last = 'Anonymous';
		}
		if (first == '' && last != '' && state != '') {
			last = last + ',';
		}
		if (first != '' && last != '') {
			first = first[0] + '.';
		}
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
				}
			});

	//Saving Submission to DB
	submission.save(function (e, submission, count) {
		//Photo Variables
		var photo = req.files.image,
			cloudfrontURL;
			//Image Upload - S3
			if (req.param("selectedImage") == 'default-image.png') {
				var ext = photo.name.split('.', 2)[1];
					photo.name = submission._id + '.' + ext;
					cloudfrontURL = 'feed-images/' + photo.name;

				//S3 Image Upload Handling
				//Authentication - Deployment Version
				// var s3 = knox.createClient({
				// 	key: process.env.AWS_ACCESS_KEY_ID,
				// 	secret: process.env.AWS_SECRET_ACCESS_KEY,
				// 	bucket: process.env.S3_BUCKET_NAME
				// });

				//S3 Headers
				var s3Headers = {
					'Content-Type': photo.type,
					'x-amx-acl': 'public-read'
				};
				if (e) return console.log(e)
				//Putting Files to S3
				s3.putFile(photo.path, cloudfrontURL, s3Headers, function (err, s3res) {
					if (err) return console.log(err);
					s3imgURL = s3res.url;
					//Updating Submission With S3 URL for Image
					var update = Submission.update({_id: submission._id}, {$set: {cloudfrontURL: cloudfrontURL}}, function () {
						update.exec(function (error, updated) {
							if (error) {
								res.render('failed', {
									title: "Submission Failed"
								});
								return console.log(error);
							}
							res.render('success', {
								title: 'Success'
							});
						});
					});
				});
			//Selected Image / No Upload
			} else {
				cloudfrontURL = 'feed-images/' + req.param("selectedImage");
				var update = Submission.update({_id: submission._id}, {$set: {cloudfrontURL: cloudfrontURL}}, function () {
					update.exec(function (error, updated) {
						if (error) {
							res.render('failed', {
								title: "Submission Failed"
							});
							return console.log(error);
						}
						res.render('success', {
							title: 'Success'
						});
					});
				});
			}
	});
};

exports.editImage = function (req, res) {
	var photo = req.files.image;
		console.log(photo);
};

//Retrieve Stories
exports.retrieve = function (req, res) {
	var skipValue = 16 * (req.param("page") -1);
	var query = Submission.find({approved: true}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt', {skip: skipValue, limit: 16});
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
};

//Retrieve for Moderation
exports.newPosts = function (req, res) {
	// Submission.remove({}, function () {
	// 	return console.log("submissions removed")
	// })
	var query = Submission.find({updated: null}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt');
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
};

//Update Post
exports.approvePosts = function (req, res) {
	var idList = req.param("idList");
	var updated = new Date();
	var update = Submission.update({_id: { $in: idList}}, {$set: {approved: true, updatedAt: updated}}, {multi: true}, function () {
		update.exec(function (err, submissions) {
			if (err) return console.log(err)
		})
	});
	var query = Submission.find({approved: false}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt', function () {
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
	});
};

//Hide Post
exports.hidePosts = function (req, res) {
	var idList = req.param("idList");
	var updated = new Date();
	var update = Submission.update({_id: { $in: idList}}, {$set: {approved: false, updatedAt: updated}}, {multi: true}, function () {
		update.exec(function (err, submissions) {
			if (err) return console.log(err)
		})
	});
	var query = Submission.find({approved: true}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt', function () {
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
	});
};

exports.showApproved = function (req, res) {
	var query = Submission.find({approved: true}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt', function () {
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
	});		
};

exports.showHidden = function (req, res) {
	var query = Submission.find({approved: false}, 'approved story name.first name.last location.country location.state location.city s3imgURL cloudfrontURL createdAt updatedAt', function () {
		query.exec(function (error, submissions) {
			if (error) return console.log(error)
			res.json(submissions);
		})
	});
};

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