import dotenv from 'dotenv';
import CurrenciesModel from '../../models/currency.model';

dotenv.config();

export async function getCurrenciesPerDate(req, res) {
	const { limit, page } = req.query;

	const options = {limit: Number(limit), page: Number(page)};

	const myAggregate = CurrenciesModel.aggregate();
	let response;
	try {
		response = await CurrenciesModel.aggregatePaginate(myAggregate, options);
	} catch (err) {
		console.log(err);
	}
	
	return res.response(response);
}


export async function getCurrenciesSymbols(req, res) {
	const { currenciesHashes } = JSON.parse(req.payload);

	const response = await CurrenciesModel.find({hash: {$in: currenciesHashes }});
	
	return res.response({currenciesSymbols: response});
}