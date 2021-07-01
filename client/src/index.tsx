import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache
} from '@apollo/client';
import React from 'react';
import { render } from 'react-dom';
import Listings from './sections/Listings/Listings';

import './styles/index.css';

const client = new ApolloClient({
	uri: '/api',
	cache: new InMemoryCache()
});

render(
	<ApolloProvider client={ client }>
		<Listings />
	</ApolloProvider>,
	document.getElementById('root')
);
