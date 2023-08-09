import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { User } from './models/user.js';
import { Book } from './models/book.js';
import { Author } from './models/author.js';

export const resolvers = {
	Query: {
		me: (context) => {
			return context.currentUser;
		},
		authorCount: async () => Author.collection.countDocuments(),
		bookCount: async () => Book.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (args.author && args.genre) {
				const author = await Author.findOne({ name: args.author });
				return Book.find({
					$and: [
						{ author: { $in: author.id } },
						{ genres: { $in: args.genre } },
					],
				}).populate('author');
			}

			if (args.author) {
				const author = await Author.findOne({ name: args.author });
				return Book.find({ author: { $in: author.id } }).populate('author');
			}

			if (args.genre) {
				return Book.find({ genres: { $in: args.genre } }).populate('author');
			}

			return Book.find({}).populate('author');
		},

		allAuthors: async () => Author.find({}),
		me: (root, args, context) => {
			return context.currentUser;
		},
	},
	Author: {
		bookCount: async (root) => {
			const author = await Author.findOne({ name: root.name });
			const books = await Book.find({ author: author.id });
			return books.length;
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			if (!context.currentUser) {
				throw new AuthenticationError('not authenticated');
			}

			let author = await Author.findOne({ name: args.author });

			if (!author) {
				author = new Author({ name: args.author });

				try {
					await author.save();
				} catch (error) {
					throw new UserInputError(error.message, { invalidArgs: args });
				}
			}

			const book = new Book({ ...args, author });

			try {
				await book.save();
			} catch (error) {
				throw new UserInputError(error.message, { invalidArgs: args });
			}
			return book;
		},
		editAuthor: async (root, args, context) => {
			const existingAuthor = await Author.findOne({ name: args.name });
			if (!context.currentUser) {
				throw new AuthenticationError('not authenticated');
			}

			if (!existingAuthor) {
				return null;
			}

			try {
				existingAuthor.born = args.setBornTo;
				await existingAuthor.save();
				return existingAuthor;
			} catch (error) {
				throw new GraphQLError('Edit Author failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args,
						error,
					},
				});
			}
		},
		createUser: async (root, args) => {
			const user = new User({ ...args });

			return user.save().catch((error) => {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
};
