'use strict';

// var Poll = new Schema({
//   title : String,
//   answers : {
//       answers : [],
//       votes : [] 
//   },
   
// });

var testpolls = [
	{
		title:'test1',
		data: {answers:['are you an idiot?', 'are yto a moneky?'], votes:[1,2]}
	},
	{
		title:'test2',
		data: {answers:['are you ans idiot?', 'are you ans idiot mega?', 'are yto a moneky?'], votes:[1,2,10]}
	}
	];

var path = process.cwd();
// var fetch = require('node-fetch');
var http = require('http');
// var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

var PollHandler = require(path + '/pollHandler.server.js');

module.exports = function(app, passport) {

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			res.redirect('/home');
		}
	}

	app.route('/')
		.get(isLoggedIn, function(req, res) {
			res.redirect('/home');
		});

	app.route('/home')
		.get(function(req, res) {
			if(req.isAuthenticated()){
				res.render('pages/index', {
				displayname: req.user.facebook.displayName || 'Guest',
				polls:testpolls
			});	
			} else {
				res.render('pages/index', {
				displayname: 'Guest',
				polls:testpolls
			});		
			}
			
		});

	app.route('/logout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/home');
		});

	app.route('/profile')
		.get(isLoggedIn, function(req, res) {
			// res.sendFile(path + '/public/profile.html');
			res.render('pages/profile', {
				profileid: req.user.facebook.id,
				displayname: req.user.facebook.displayName,
				polls: testpolls
			});
			console.log('rendered profile');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function(req, res) {
			res.json(req.user.facebook);
		});

	app.route('/auth/facebook')
		.get(passport.authenticate('facebook'));

	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/profile',
			failureRedirect: '/home'
		}));

	app.route('/api/:userid/polls')
		.get(isLoggedIn, function(req, res) {
			res.json(req.user.polls);
		})
		.post(isLoggedIn, function(req, res) {
			PollHandler.addPoll(req, res);

		});

	app.route('/api/polls')
		.get(function(req, res) {
			res.json(PollHandler.getPolls);
		});

	// app.route('/api/:userid/newpoll')
	// 	.post(isLoggedIn, PollHandler.addPoll);

	// app.route('/api/')

	// app.route('/api/:id/clicks')
	// // 	.get(isLoggedIn, clickHandler.getClicks)
	// 	.post(isLoggedIn, PollHandler.addClick)
	// 	.delete(isLoggedIn, clickHandler.resetClicks);
};
