import React from 'react';
import './Page.css';

export default props => {
    const imgUrl = require(`../media/${props.data.image}`)

    return (
        <div>
            <img src={ imgUrl }/>
            <h1>{ props.data.title }</h1>
            <div>{ props.data.body }</div>
        </div>
    );
};
