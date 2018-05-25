import React, { Component } from 'react';
import Page from './Pages/Page';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom'
import data from './cms/data.json';
import './bootstrap/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            pages: data.pages,
            media: data.media,
        };
    }

    render() {
        let navItems = [];
        let routes = [];
        this.state.pages.forEach(page => {
            let title = '';
            let slug = '/';
            let exact = false;

            const pageMedia = page.media ? page.media.map(mediaId => {
                return this.state.media.find(media => media.id === mediaId);
            }): [];

            let component = router => {
                console.log(router)
                return (
                    <Page
                        data={ page }
                        media={ pageMedia }
                        posts={ this.state.data[page.has_posts_of_type] }
                        allMedia={ page.has_posts_of_type ? this.state.media : null }
                        router={ router }
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
                        exact={ exact }
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
