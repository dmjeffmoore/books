import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import Footer from './footer';
import Home from './pages/home';
import NotFound from './pages/notFound';

class App extends Component {
    render() {
        return (
            <Router>
                <div id="content">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
                <Footer/>
            </Router>
        )
    }
}

export default App;
