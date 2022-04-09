import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from '@hapi/jwt';
import UserModel from '../../models/user.model';

dotenv.config();

export async function signUp(req, res) {
	const {
		name, email, password, password2,
	} = req.payload;

	if (password !== password2) {
		return res.response({ code: 'PASSWORD_NOT_SAME' }).code(403);
	}

	const isUserExist = await UserModel.findOne({ email }).lean();
	if (isUserExist) {
		return res.response({ code: 'USER_ALREADY_EXIST' }).code(409);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const User = await UserModel.create({
		name,
		email,
		password: hashedPassword,
	});

	return res.response({ code: 'USER_CREATED', email: User.email }).code(201);
}

export async function login(req, res) {
	const { name, password } = req.payload;

	const User = await UserModel.findOne({ name }).lean();
	if (!User) {
		return res.response({ code: 'USER_DOES_NOT_EXIST' }).code(409);
	}

	const isGoodPassword = bcrypt.compare(password, User.password);
	if (!isGoodPassword) {
		return res.response({ code: 'NOT_GOOD_PASSWORD' }).code(409);
	}

	const token = jwt.token.generate(
		{
			aud: 'urn:audience:test',
			iss: 'urn:issuer:test',
			name: User.name,
			_id: User._id,
			group: 'hapi_community',
			scope: 'admin',
		},
		{
			key: process.env.TOKEN_KEY,
		},
		{
			ttlSec: 3600,
		},
	);
	console.log('pipi');
	return res.response({
		code: 'USER_LOGGED', _id: User._id, email: User.email, token,
	});
}

export async function changePassword(req, res) {
	const { oldPassword, newPassword, newPassword2 } = req.payload;

	const User = await UserModel.findById(req.auth?.credentials?._id).lean();
	if (!User){
		return res.response({ code: 'USER_NOT_FOUND' }).code(409);
	}

	if (newPassword !== newPassword2) {
		return res.response({ code: 'NEW_PASSWORD_NOT_SAME' }).code(403);
	}

	const isGoodPassword = bcrypt.compare(oldPassword, User.password);
	if (!isGoodPassword) {
		return res.response({ code: 'NOT_GOOD_PASSWORD' }).code(409);
	}

	const hashedPassword = await bcrypt.hash(oldPassword, 10);

	await UserModel.findByIdAndUpdate(User._id, {$set: {password: hashedPassword}});
	
	return res.response({ code: 'USER_PASSWORD_UPDATED' }).code(201);
}
