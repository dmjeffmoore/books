import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';

import Home from './pages/home';
import NotFound from './pages/notFound';
import Menu from './menu';

const config = {
    issuer: process.env.ISSUER,
    redirectUri: window.location.origin + '/implicit/callback',
    clientId: process.env.CLIENT_ID,
    pkce: true
};

function App() {
    return(
        <Router>
                <Switch>
                    <Security {...config}>
                        <Menu />
                        <Route exact path="/" component={Home} />
                        <Route path="/implicit/callback" component={ImplicitCallback}/>
                    </Security>
                </Switch>
        </Router>
    )
}

export default App;
