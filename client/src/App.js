import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Register from './Components/Register'
import Profile from './Components/Profile'
import Login from './Components/Login'
import Wall from './Components/Wall'
class App extends Component {
    render() {
        return (
            <Router>
                <Navbar/>
                <Route exact path="/" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/wall" component={Wall} />
            </Router>
        );
    }
}

export default App;
