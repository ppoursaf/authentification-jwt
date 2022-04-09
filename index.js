import dotenv from 'dotenv';
dotenv.config();
import Hapi from '@hapi/hapi';
import mongoose from 'mongoose';
import UserRoute from './src/app/User/user.route';
import jwt from '@hapi/jwt';



const start = async () => {

	const server = Hapi.server({
		port: 3000,
		host: 'localhost'
	});
	await server.register(jwt);

	server.auth.strategy('my_jwt_strategy', 'jwt', {
		keys: process.env.TOKEN_KEY,
		verify: false,
		validate: (artifacts, request, h) => {
			if ((new Date()).getTime() > artifacts.decoded.payload.exp * 1000){
				// token is expired
				return { isValid: false };
			}
			return {
				isValid: true,
				credentials: { ...artifacts.decoded.payload},
			};
		} 
	});

	// Set the strategy
	server.auth.default('my_jwt_strategy');
  
	await server.start();
	
	await mongoose
		.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log('Connexion à MongoDB réussie !'))
		.catch(() => console.log('Connexion à MongoDB échouée !'));

	server.route([...UserRoute]);
};

start();


