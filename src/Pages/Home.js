import React from 'react';
import './Page.css';

export default props => {
    const imgUrl = require(`../media/${props.data.image}`)
    return (
        <div>
            <img src={ imgUrl }/>
        </div>
    );
};
