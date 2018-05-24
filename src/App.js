import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Page from './Pages/Page';
import ProjectListItem from './Projects/ProjectListItem';
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
            <div className='container'>
                <NavBar/>
                <Page data={this.state.data.pages[0]}/>
                <ul>
                    { projectListItems }
                </ul>
            </div>
        );
    }
}

export default App;
