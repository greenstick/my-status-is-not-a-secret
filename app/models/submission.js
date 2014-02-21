var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SubmissionSchema = new Schema ({
	id: Number,
	date: Date,
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
	createdAt: String,
	updatedAt: String
});

SubmissionSchema.methods.getSubmission = function () {
	var id = this.id,
		order = this.order,
		first = this.name.first,
		last = this.name.last,
		story = this.story, 
		country = this.location.country,
		state = this.location.state,
		city = this.location.city,
		popularity = this.popIndex,
		twitter = this.social.twitter,
		facebook = this.social.facebook,
		img = this.s3imgURL,
		url = this.cloudfrontURL;

	//Return Post Object
	return {
		submission: {
			id: id,
			order: this.order,
			firstName: first,
			lastName: last,
			story: story,
			country: country,
			state: state, 
			city: city,
			popularity: popularity,
			twitter: twitter,
			facebook: facebook,
			img: img,
			url: url
		}
	}
};

SubmissionSchema.methods.postSubmission = function () {
	
}

var Submission = mongoose.model('Submission', SubmissionSchema);

Submission.find(function (error, submissions) {
	if (error) {
		console.log("Error:" + error);
	}
	console.log(submissions);
});