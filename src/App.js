import React, { Component } from 'react';
import Page from './Pages/Page';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom'
import data from './cms/data.json';
import _ from 'lodash';
import './bootstrap/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            pages: data.pages,
        };
    }

    render() {
        let navItems = [];
        let routes = [];
        this.state.pages.forEach(page => {
            let title = '';
            let slug = '/';
            let exact = false;
            let component = () => {
                return (
                    <Page
                        data={ page }
                        posts={ this.state.data[page.has_posts_of_type] }
                    />
                );
            };

            if (page.name === 'home') {
                title = this.state.data.site_info.title;
                exact = true;
            } else {
                title = page.name;
                slug = `/${ page.name }`;
            }

            const navItem = (
                <li key={ slug }>
                    <NavLink
                        exact
                        to={ slug }
                        activeClassName='selected'
                    >{ title }</NavLink>
                </li>
            );
            navItems.push(navItem);

            const route = (
                <Route
                    key={ slug }
                    exact={ exact }
                    path={ slug }
                    component={ component }
                />
            );
            routes.push(route);
        });

        return (
            <Router>
                <div className='container'>
                    <header className='navtabbar'>
                        <ul>
                            { navItems }
                            <li className='end-tab'>&nbsp;</li>
                        </ul>
                    </header>

                    { routes }
                </div>
            </Router>
        );
    }
}

export default App;
