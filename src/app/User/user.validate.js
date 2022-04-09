import Joi from 'joi';


// -- CreateUser -- //

export const createUserRequest = {
	payload: Joi.object({
		password2: Joi.string().min(8).required(),
		password: Joi.string().min(8).required(),
		email: Joi.string().email().required(),
		name: Joi.string().required(),
	}),
};

export const createUserResponse = {
	schema: Joi.object({
		code: Joi.string(),
		email: Joi.string(),
	}),
};


// -- LoginUser -- //

export const loginRequest = {
	payload: Joi.object({
		name: Joi.string().required(), 
		password: Joi.string().min(8).required(), 
	})
};

export const loginResponse = {
	schema: Joi.object({
		code: Joi.string(), 
		_id: Joi.any(), // install joi.objectId() 
		email: Joi.string(), 
		token: Joi.string(),
	})
};


// -- ChangePassword -- //

export const changePasswordRequest = {
	payload: Joi.object({
		oldPassword: Joi.string().min(8).required(), 
		newPassword: Joi.string().min(8).required(), 
		newPassword2: Joi.string().min(8).required(), 
	})
};

export const changePasswordResponse = {
	schema: Joi.object({
		code: Joi.string(), 
	})
};