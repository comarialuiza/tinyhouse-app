import { useMutation } from '@apollo/client';
import { Affix, Layout, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HeaderSkeleton from './components/HeaderSkeleton';
import LogIn from './lib/graphql/mutations/LogIn';
import { LogIn as LogInData, LogInVariables } from './lib/graphql/mutations/__generated__/LogIn';
import { Viewer } from './lib/types';
import Home from './sections/Home/Home';
import Host from './sections/Host/Host';
import Listing from './sections/Listing/Listing';
import Listings from './sections/Listings/Listings';
import Login from './sections/Login/Login';
import NotFound from './sections/NotFound/NotFound';
import User from './sections/User/User';
import ErrorBanner from './components/ErrorBanner';

const initialViewer: Viewer = {
	id: null,
	token: null,
	avatar: null,
	hasWallet: null,
	didRequest: false
}

const Routes = () => {
	const [viewer, setViewer] = useState<Viewer>(initialViewer);
	const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LogIn, {
		onCompleted: data => {
			if (data && data.logIn) {
				setViewer(data.logIn);

				if (data.logIn.token) {
					sessionStorage.setItem('token', data.logIn.token);
				} else {
					sessionStorage.removeItem('token');
				}
			}
		}
	});

	const logInRef = useRef(logIn);

	useEffect(() => {
		logInRef.current();
	}, []);

	useEffect(() => {
		console.log(viewer);
	}, [viewer]);

	const logInErrorBanner = error ?
		<ErrorBanner description='We were not able to verify if you were logged in. Please try again later.' /> :
		null;

	const content = !viewer.didRequest && !error ? (
		<Layout className='app-skeleton'>
			<HeaderSkeleton />

			<div className="app-skeleton__spin-section">
				<Spin size='large' tip='Launching Tinyhouse' />
			</div>
		</Layout>
	) : (
		<Affix offsetTop={ 0 } className='app__affix-header'>
			<Header viewer={ viewer } setViewer={ setViewer } />
		</Affix>
	);

	return (
		<BrowserRouter>
			<Layout id='app'>
				{ logInErrorBanner }
				
				{ content }

				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/host' exact component={Host} />
					<Route path='/listing/:id' exact component={Listing} />
					<Route path='/listings/:location?' exact component={Listings} />
					<Route
						path='/login'
						exact
						render={ props => <Login {...props} setViewer={setViewer} /> }
					/>
					<Route
						path='/user/:id'
						exact
						render={ props => <User {...props} viewer={ viewer }/>}
					/>
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
};

export default Routes;
