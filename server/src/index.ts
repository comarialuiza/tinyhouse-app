require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { connectDatabase } from './database';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

const port = process.env.PORT;

const mount = async (app: Application) => {
	const db = await connectDatabase();
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => ({ db }),
	});
	server.applyMiddleware({ app, path: '/api' });

	app.listen(port);
};

mount(express());
