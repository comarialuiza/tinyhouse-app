import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache
} from '@apollo/client';
import React from 'react';
import { render } from 'react-dom';
import Routes from './routes';

import './styles/index.css';

const client = new ApolloClient({
	uri: '/api',
	cache: new InMemoryCache()
});

render(
	<ApolloProvider client={ client }>
		<Routes />
	</ApolloProvider>,
	document.getElementById('root')
);
