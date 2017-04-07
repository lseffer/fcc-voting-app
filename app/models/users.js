'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Poll = require("./polls.js");

var User = new Schema({
	facebook: {
		id: String,
		displayName: String,
	},
   polls: [Poll]
});



module.exports = mongoose.model('User', User);
