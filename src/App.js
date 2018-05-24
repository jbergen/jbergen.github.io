import React, { Component } from 'react';
import Page from './Pages/Page';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom'
import Home from './Pages/Home';
import Work from './Pages/Work';
import About from './Pages/About';
import data from './cms/data.json';
import _ from 'lodash';
import './bootstrap/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { data: data };
    }

    home = () => {
        return <Home data={ this.state.data.pages[1] }/>;
    }

    work = () => {
        return <Work projects={ this.state.data.projects }/>;
    }

    about = () => {
        return <Page data={ this.state.data.pages[0] }/>;
    }

    render() {
        return (
            <Router>
                <div className='container'>
                    <header className='navtabbar'>
                        <ul>
                            <li>
                                <NavLink
                                    exact
                                    to='/'
                                    activeClassName='selected'
                                >Joseph Bergen</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/work'
                                    activeClassName='selected'
                                >work</NavLink>
                            </li>
                            <li className=''>
                                <NavLink
                                    to='/about'
                                    activeClassName='selected'
                                >about</NavLink>
                            </li>
                            <li className='end-tab'>&nbsp;</li>
                        </ul>
                    </header>

                    <Route exact path="/" component={ this.home } />
                    <Route path="/work" component={ this.work } />
                    <Route path="/about" component={ this.about } />
                </div>
            </Router>
        );
    }
}

export default App;
