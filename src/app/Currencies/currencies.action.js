import dotenv from 'dotenv';
import CurrenciesModel from '../../models/currency.model';
import axios from 'axios';

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


export async function getCurrencyPrice(req, res) {
	console.log('zizizizizizi');

	const apiKey = '1dab3805-3dda-4113-a2ee-b729b2cc14a1';
	let url = 'https://pro-api.coinmarketcap.com/v1/exchange/info';
	const qString = '?CMC_PRO_API_KEY=' + apiKey + '&id=1'; // + '&sort=market_cap&start=1&limit=10&cryptocurrency_type=tokens&convert=USD';
	let response;
	try {
		response = await axios.get(`${url}${qString}`);
	} catch (err) {
		console.log('zizizi', err.message, err.response, Object.keys(err));
	}

	console.log(response);
			
	return res.response({currencyPrice: response.data});
}


