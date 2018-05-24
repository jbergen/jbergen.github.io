import React from 'react';
import ProjectListItem from '../Projects/ProjectListItem';
import './Page.css';

export default props => {
    const projectListItems = props.projects.map(project => {
        if (project.visible) {
            return <ProjectListItem key={ project.slug } project={ project }/>;
        } else {
            return null;
        }
    });

    return (
        <div>
            <ul>
                { projectListItems }
            </ul>
        </div>
    );
};
