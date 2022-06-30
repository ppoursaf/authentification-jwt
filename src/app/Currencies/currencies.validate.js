import Joi from 'joi';


export const PAGING = {
	PAGE_DEFAULT : 1,
	PER_PAGE_DEFAULT : 10,
	TOTAL_PAGES : 5,
};
  
// -- GET CURRENCIES PER DATE -- //

export const getCurrenciesPerDateRequest = {
	query: Joi.object().keys({
		limit: Joi.number(),
		page: Joi.number(),
		date: Joi.date()
	}),
};

export const getCurrenciesPerDateResponse = {
	schema: Joi.object({
		code: Joi.string(),
		email: Joi.string(),
	}),
};


export const getCurrenciesSymbolsRequest = {
	payload: Joi.object({
		currenciesHashes: Joi.array().items(Joi.string())
	})
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