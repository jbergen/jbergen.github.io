import React from 'react';

export default props => {
    return (
        <li className='col-sm-6'>
            <h1>{ props.post.name }</h1>
        </li>
    );
};
