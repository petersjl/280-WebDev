const mongoose = require("mongoose").set('debug', true);

//setting up a schema to add structure to database
const helloEntrySchema = new mongoose.Schema( {
    name: String, 
    count: Number
});

const HelloEntry = mongoose.model('HelloEntry', helloEntrySchema, 'helloentry');

module.exports = HelloEntry;