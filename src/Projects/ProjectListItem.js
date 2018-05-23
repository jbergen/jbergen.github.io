import React from 'react';

export default function(props) {
    return (
        <li className='col-sm-6'>
            <h1>{ props.project.name }</h1>
        </li>
    );
};
