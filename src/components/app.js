import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';

import Home from './pages/home';

const config = {
    issuer: process.env.REACT_APP_OIDC_ISSUER,
    redirectUri: window.location.origin + '/implicit/callback',
    clientId: process.env.REACT_APP_OIDC_CLIENT_ID,
    pkce: true
};

function App() {
    return(
        <Router>
            <Switch>
                <Security {...config}>
                    <Route exact path="/" component={Home}/>
                    <Route path="/implicit/callback" component={ImplicitCallback}/>
                </Security>
            </Switch>
        </Router>
    )
}

export default App;
