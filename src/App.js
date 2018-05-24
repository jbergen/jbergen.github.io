import React, { Component } from 'react';
import Page from './Pages/Page';
import ProjectListItem from './Projects/ProjectListItem';
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
        this.state = { data: data };
    }

    render() {
        const projectListItems = _.map(this.state.data.projects, project => {
            if (project.visible) {
                return <ProjectListItem key={project.slug} project={project}/>;
            } else {
                return null;
            }
        });

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
                    <Page data={this.state.data.pages[0]}/>
                    <ul>
                        { projectListItems }
                    </ul>
                </div>
            </Router>
        );
    }
}

export default App;
