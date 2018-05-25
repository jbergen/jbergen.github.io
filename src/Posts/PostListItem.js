import React from 'react';
import { Link } from 'react-router-dom'

export default props => {
    return (
        <li className='col-sm-6'>
            <h1>
                <Link
                    to={ `${props.router.match.path}/${props.post.slug}` }
                >
                    { props.post.name }
                </Link>
            </h1>
        </li>
    );
};
