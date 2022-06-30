import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';


//------------ Trade Schema ------------//
const CurrencySchema = new mongoose.Schema({
	hash: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	decimals: {
		type: Number,
		required: true
	},
	symbol: {
		type: String,
		required: true
	},
	totalBuy: {
		type: Number,
	},
	totalSell: {
		type: Number,
	},
	countSell: {
		type: Number,
	},
	countBuy: {
		type: Number,
	}
}, { timestamps: true });

CurrencySchema.plugin(aggregatePaginate);

export default mongoose.model('currency', CurrencySchema);
