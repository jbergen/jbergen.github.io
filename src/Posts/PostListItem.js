import React from 'react';
import { Link } from 'react-router-dom'

export default props => {
    console.log(props)
    const listThumb = (() => {
        if (props.media) {
            const imgURL = require(`../media/${ props.media.filename }`)
            const style = {
                backgroundImage: `url(${imgURL})`
            };
            return <div className='list-thumb' style={ style }/>;
            // return <img key={ imgURL } src={ imgURL } alt={ imgURL }/>
        }
        return null
    })()

    return (
        <li className='col-sm-6'>
            <Link
                to={ `${props.router.match.path}/${props.post.slug}` }
            >
                { props.post.name }
                { listThumb }
            </Link>
        </li>
    );
};
