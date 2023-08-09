import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

import { User } from './models/user.js';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();
import { typeDefs } from './schema.js';
import { resolvers } from './resolves.js';

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message);
	});

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.startsWith('bearer ')) {
			const decodedToken = jwt.verify(
				auth.substring(7),
				process.env.JWT_SECRET
			);
			const currentUser = await User.findById(decodedToken.id);
			return { currentUser };
		}
	},
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at ${url}`);
