import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './sections/Home/Home';
import Host from './sections/Host/Host';
import Listing from './sections/Listing/Listing';
import Listings from './sections/Listings/Listings';
import Login from './sections/Login/Login';
import NotFound from './sections/NotFound/NotFound';
import User from './sections/User/User';
import { Layout } from 'antd';

const Routes = () => {
	return (
		<BrowserRouter>
			<Layout id='app'>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/host' exact component={Host} />
					<Route path='/listing/:id' exact component={Listing} />
					<Route path='/listings/:location?' exact component={Listings} />
					<Route path='/login' exact component={Login} />
					<Route path='/user/:id' exact component={User} />
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
};

export default Routes;
