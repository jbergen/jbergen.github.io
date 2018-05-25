import React from 'react';
import { Link } from 'react-router-dom'

export default props => {
    const listThumb = (() => {
        if (props.media) {
            const imgURL = require(`../media/${ props.media.filename }`)
            const style = { backgroundImage: `url(${imgURL})` };
            return <div className='list-thumb' style={ style }/>;
        }
        return null
    })()

    return (
        <li className='col-sm-6'>
            <Link
                to={ `${props.router.match.path}/${props.post.slug}` }
            >
                { listThumb }
                { props.post.name }
            </Link>
        </li>
    );
};
