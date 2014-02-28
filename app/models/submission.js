var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SubmissionSchema = new Schema ({
	id: Number,
	date: Date,
	approved: Boolean,
	timezone: Date,
	order: Number,
	name: {
		first: String,
		last: String
	},
	location: {
		country: String,
		state: String,
		city: String
	},
	story: String,
	popIndex: Number,
	social: {
		twitter: String,
		facebook: String
	},
	s3imgURL: String,
	cloudfrontURL: String,
	createdAt: Date,
	updatedAt: Date
});

module.exports = mongoose.model("submission", SubmissionSchema);
