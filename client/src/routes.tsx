import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './sections/Home/Home';
import Host from './sections/Host/Host';
import Listing from './sections/Listing/Listing';
import Listings from './sections/Listings/Listings';
import Login from './sections/Login/Login';
import NotFound from './sections/NotFound/NotFound';
import User from './sections/User/User';
import { Layout, Affix } from 'antd';
import { Viewer } from './lib/types';
import Header from './components/Header';

const initialViewer: Viewer = {
	id: null,
	token: null,
	avatar: null,
	hasWallet: null,
	didRequest: false
}

const Routes = () => {
	const [viewer, setViewer] = useState<Viewer>(initialViewer);

	return (
		<BrowserRouter>
			<Layout id='app'>
				<Affix offsetTop={ 0 } className='app__affix-header'>
					<Header viewer={ viewer } setViewer={ setViewer } />
				</Affix>

				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/host' exact component={Host} />
					<Route path='/listing/:id' exact component={Listing} />
					<Route path='/listings/:location?' exact component={Listings} />
					<Route
						path='/login'
						exact
						render={
							props => <Login {...props} setViewer={setViewer} />
						}
					/>
					<Route path='/user/:id' exact component={User} />
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
};

export default Routes;
