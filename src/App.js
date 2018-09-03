import React, { Component } from 'react';
import Navbar from './Navbar';
import Page from './Pages/Page';
import Media from './Pages/Media';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import data from './cms/data.json';
import pageView from './pageView';
import './bootstrap/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { data: data };
    }

    renderMediaPage = router => {
        const { data } = this.state;
        const media = data.media.find(media => media.id === router.match.params.id)
        if (media) {
            pageView(media.title, router.location.pathname);
            return <Media media={media} data={this.state.data}/>;
        } else {
            return <Redirect to='/'/>;
        }
    }

    render() {
        const pageRoutes = this.state.data.pages.map(page => {
            const path = page.name === 'home' ? '/' : `/${page.name}`;
            const exact = page.name === 'home' || !!page.redirect;

            const component = router => {
                if (page.redirect) {
                    return <Redirect to={page.redirect}/>;
                }
                return (
                    <Page
                        page={page}
                        data={this.state.data}
                        router={router}
                    />
                );
            };

            return (
                <Route
                    key={path}
                    exact={exact}
                    path={path}
                    render={component}
                />
            );
        });

        return (
            <Router>
                <div className='container'>
                    <Navbar
                        siteTitle={this.state.data.site_info.title}
                        pages={this.state.data.pages}
                    />
                    <Switch>
                        {pageRoutes}
                        <Route
                            path={`/media/:id`}
                            render={this.renderMediaPage}
                        />
                        <Route render={() => (<Redirect to='/'/>)}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
