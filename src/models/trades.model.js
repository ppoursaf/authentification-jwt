import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';


//------------ Trade Schema ------------//
const TradeSchema = new mongoose.Schema({
	buyCurrency: {
		type: String,
		required: true,
		index: true
	},
	sellCurrency: {
		type: String,
		required: true,
		index: true
	},
	buyAmount: {
		type: Number,
		required: true
	},
	sellAmount: {
		type: Number,
		required: true
	},
	address: {
		type: String,
		required: true,
		index: true
	},
	hash: {
		type: String,
		required: true
	},
	blockNumber: {
		type: Number,
		required: true,
		index: true
	},
	timestamp: {
		type: Date,
		required: true
	},
}, { timestamps: true });

TradeSchema.plugin(aggregatePaginate);

export default mongoose.model('Trades', TradeSchema);