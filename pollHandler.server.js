'use strict';
const bodyParser = require('body-parser');
var Users = require('./app/models/users.js');
var Poll = require('./app/models/polls.js');

function PollHandler() {

	this.getClicks = function(req, res) {


		Users
			.findOne({
				'github.id': req.user.github.id
			}, {
				'_id': false
			})
			.exec(function(err, result) {
				if (err) {
					throw err;
				}

				res.json(result.nbrClicks);
			});
	};

	this.getPolls = function(req, res) {

		Users
			.find({})
			.populate({
				path: 'polls',
				select: 'title answers'
			})
			.exec(function(err, result) {
				if (err) {
					throw err;
				}

				res.json(result);
			});
		console.log('this worked');
			// Users
			// 	.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			// 	.exec(function (err, result) {
			// 		if (err) { throw err; }

		// 		res.json(result.nbrClicks);
		// 	});
	};

	this.addPoll = function(req, res) {

		Users
			.findOne({
				'facebook.id': req.user.facebook.id
			}).exec(function(err, result) {
				if (err) {
					throw err;
				}
				var theuser = result;
				var newpoll = new Poll(req.body);
				theuser.polls.push(newpoll);
				theuser.save(function(err, result) {
					if (err) {
						throw err;
					}
					res.json(result);
				});
			});
	};

	this.addClick = function(req, res) {
		Users
			.findOneAndUpdate({
				'github.id': req.user.github.id
			}, {
				$inc: {
					'nbrClicks.clicks': 1
				}
			})
			.exec(function(err, result) {
				if (err) {
					throw err;
				}

				res.json(result.nbrClicks);
			});
	};

	this.resetClicks = function(req, res) {
		Users
			.findOneAndUpdate({
				'github.id': req.user.github.id
			}, {
				'nbrClicks.clicks': 0
			})
			.exec(function(err, result) {
				if (err) {
					throw err;
				}

				res.json(result.nbrClicks);
			});
	};

}

module.exports = PollHandler;
