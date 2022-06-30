const mongoose = require('mongoose')

//------------ failBlock Schema ------------//
const FailBlockSchema = new mongoose.Schema({
	blockNumber: {
		type: Number,
		required: true
	},
	success: {
		type: Boolean,
		required: true
	}
}, { timestamps: true });

module.exports = mongoose.model('FailBlock', FailBlockSchema);


