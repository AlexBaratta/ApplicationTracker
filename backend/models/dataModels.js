const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationsSchema = new mongoose.Schema({
   CompanyName: String,
   AppliedDate: Date,
   ApplicationStatus: String 
});

const Applications = mongoose.model('Applications', ApplicationsSchema);

module.exports = { Applications };