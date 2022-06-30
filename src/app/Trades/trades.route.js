import Joi from 'joi';
import { PREFIX } from '../../enum';
import * as action from './trades.action';
import * as validate from './trades.validate';
import TradesModel from '../../models/trades.model';

const failAction = (request, h, err) => {
	request.log('error', err);
	throw err;
};

export default [
	{
		path: '/trades/{currencyHash}',
		method: 'GET',
		options: {
			description: 'get trades by hash currency',
			auth: false,
			//validate: { ...validate.createUserRequest, failAction },
			handler: action.getTradesByHashCurrency,
			//response: validate.createUserResponse,
		},
	},
	{
		path: '/trades/address/{address}',
		method: 'GET',
		options: {
			description: 'get trades by address',
			auth: false,
			//validate: { ...validate.createUserRequest, failAction },
			handler: action.getTradesByAddressCurrency,
			//response: validate.createUserResponse,
		},
	},
];
