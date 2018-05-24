import React from 'react';
import './Page.css';

export default props => {
    console.log(props)
    return (
        <div>
            <h1>{ props.data.title }</h1>
            <div>{ props.data.body }</div>
        </div>
    );
};
