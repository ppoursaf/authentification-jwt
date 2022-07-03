import * as action from './currencies.action';
import * as validate from './currencies.action';

const failAction = (request, h, err) => {
	request.log('error', err);
	throw err;
};

export default [
	{
		path: '/currencies',
		method: 'GET',
		options: {
			description: 'Get currencies per date',
			auth: false,
			validate: { ...validate.getCurrenciesPerDateRequest, failAction },
			handler: action.getCurrenciesPerDate,
			//response: validate.getCurrenciesPerDateResponse,
		},
	},
	{
		path: '/currencies',
		method: 'POST',
		options: {
			description: 'Get currencies per date',
			auth: false,
			validate: { ...validate.getCurrenciesSymbolsRequest, failAction },
			handler: action.getCurrenciesSymbols,
			//response: validate.getCurrenciesPerDateResponse,
		},
	},
	{
		path: '/currencies/price-cmc',
		method: 'GET',
		options: {
			description: 'Get currencies price from CoinMarketCap',
			auth: false,
			//validate: { ...validate.getCurrenciesSymbolsRequest, failAction },
			handler: action.getCurrencyPrice,
			//response: validate.getCurrenciesPerDateResponse,
		},
	},
	
];



