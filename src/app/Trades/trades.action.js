import dotenv from 'dotenv';
import TradesModel from '../../models/trades.model';

dotenv.config();

export async function getTradesByHashCurrency(req, res) {
	const { limit, page, from, to, address } = req.query;
	const { currencyHash } = req.params;

	const options = {limit: Number(limit), page: Number(page)};

	console.log(from, to, address);

	const myAggregate = TradesModel.aggregate([
		{
			$match: {
				timestamp: {$gte: new Date(from), ...(to && {$lte: new Date(to)})
				}, 
				...(address && {address}),
				$or: [{ buyCurrency: currencyHash }, { sellCurrency: currencyHash } ] 
			}
		},
		// {
		// 	$lookup: {
		// 		from: 'currencies', 
		// 		localField: 'buyCurrency', 
		// 		foreignField: 'hash', 
		// 		as: 'buySymbol'
		// 	}
		// }, 
		// {
		// 	$unwind: {
		// 		path: '$buySymbol'
		// 	}
		// }, 
		// {
		// 	$lookup: {
		// 		from: 'currencies', 
		// 		localField: 'sellCurrency', 
		// 		foreignField: 'hash', 
		// 		as: 'sellSymbol'
		// 	}
		// }, 
		// {
		// 	$unwind: {
		// 		path: '$sellSymbol'
		// 	}
		// }
	]);

	const response = await TradesModel.aggregatePaginate(myAggregate, options);

	
	return res.response(response);
}


export async function getTradesByAddressCurrency(req, res) {
	const { limit, page, from, to } = req.query;
	const { address } = req.params;

	const options = {limit: Number(limit), page: Number(page)};

	console.log(from, to, address);

	const myAggregate = TradesModel.aggregate([
		{
			$match: {
				timestamp: {$gte: new Date(from), ...(to && {$lte: new Date(to)})
				}, 
				address,
			}
		},
		// {
		// 	$lookup: {
		// 		from: 'currencies', 
		// 		localField: 'buyCurrency', 
		// 		foreignField: 'hash', 
		// 		as: 'buySymbol'
		// 	}
		// }, 
		// {
		// 	$unwind: {
		// 		path: '$buySymbol'
		// 	}
		// }, 
		// {
		// 	$lookup: {
		// 		from: 'currencies', 
		// 		localField: 'sellCurrency', 
		// 		foreignField: 'hash', 
		// 		as: 'sellSymbol'
		// 	}
		// }, 
		// {
		// 	$unwind: {
		// 		path: '$sellSymbol'
		// 	}
		// }
	]);

	const response = await TradesModel.aggregatePaginate(myAggregate, options);

	
	return res.response(response);
}