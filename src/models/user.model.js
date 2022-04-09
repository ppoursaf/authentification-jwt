
import mongoose from 'mongoose';

//------------ User Schema ------------//
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	verified: {
		type: Boolean,
		default: false
	},
	resetLink: {
		type: String,
		default: ''
	},
	token: {
		type: String,
	},
}, { timestamps: true });

export default mongoose.model('User', UserSchema);