import { Schema, model } from 'mongoose';

const schema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	favoriteGenre: {
		type: String,
	},
});

export const User = model('User', schema);
