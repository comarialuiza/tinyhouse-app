import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './sections/Home/Home';
import Host from './sections/Host/Host';
import Listing from './sections/Listing/Listing';
import Listings from './sections/Listings/Listings';
import NotFound from './sections/NotFound/NotFound';
import User from './sections/User/User';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Home }/>
                <Route path="/host" exact component={ Host }/>
                <Route path="/listing/:id" exact component={ Listing }/>
                <Route path="/listings/:location?" exact component={ Listings }/>
                <Route path="/user/:id" exact component={ User }/>
                <Route component={ NotFound }/>
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;
