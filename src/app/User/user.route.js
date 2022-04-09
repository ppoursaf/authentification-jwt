import Joi from 'joi';
import { PREFIX } from '../../enum';
import * as action from './user.action';
import * as validate from './user.validate';
import UserModel from '../../models/user.model';

const failAction = (request, h, err) => {
	request.log('error', err);
	throw err;
};

export default [
	{
		path: `/${PREFIX.USER}`,
		method: 'POST',
		options: {
			description: 'CreateUser',
			auth: false,
			validate: { ...validate.createUserRequest, failAction },
			handler: action.signUp,
			response: validate.createUserResponse,
		},
	},
	{
		path: `/${PREFIX.USER}/login`,
		method: 'POST',
		options: {
			description: 'GetToken',
			auth: false,
			validate: { ...validate.loginRequest, failAction },
			handler: action.login,
			response: validate.loginResponse,
		},
	},
	{
		path: `/${PREFIX.USER}/change-password`,
		method: 'POST',
		options: {
			description: 'ChangePassword',
			auth: {
				strategy: 'my_jwt_strategy',
			},
			validate: { ...validate.changePasswordRequest, failAction },
			handler: action.changePassword,
			response: validate.changePasswordResponse,
		},
	},
	{
		path: `/${PREFIX.USER}s`,
		method: 'GET',
		options: {
			description: 'GetUsers',
			auth: {
				strategy: 'my_jwt_strategy',
				scope: ['admin'],
			},
			handler: async (req, res) => {
				const users = await UserModel.find().lean();

				return res.response({ users }).code(201);
			},
			response: {
				schema: Joi.any(),
			},
		},
	},
];
