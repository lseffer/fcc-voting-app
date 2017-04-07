'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
   title : String,
   data : {
       answers : [],
       votes : [] 
   },
   
});

module.exports = mongoose.model('Poll', Poll).schema;
