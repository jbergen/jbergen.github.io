import React from 'react';
import './Page.css';

export default function(props) {
    return (
        <div>
            <h1>{ props.data.title }</h1>
            <div>{ props.data.body }</div>
        </div>
    );
};
