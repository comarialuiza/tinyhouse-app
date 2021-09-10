import { ApolloProvider, ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import React from 'react';
import { render } from 'react-dom';
import Routes from './routes';

import './styles/index.css';

const httpLink = new HttpLink({
    uri: '/api'
});

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: sessionStorage.getItem('token') || '',
        }
    });

    return forward(operation);
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
});

render(
	<ApolloProvider client={ client }>
		<Routes />
	</ApolloProvider>,
	document.getElementById('root')
);
