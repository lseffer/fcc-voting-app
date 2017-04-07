'use strict';

module.exports = {
	'facebookAuth': {
		'clientID': process.env.FB_CLIENT,
		'clientSecret': process.env.FB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/facebook/callback'
	}
};
