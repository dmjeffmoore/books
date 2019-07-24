import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import Home from './pages/home';
import NotFound from './pages/notFound';
import Menu from './menu';

function App() {
    return(
        <Router>
            <Menu />
            <div id="content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
