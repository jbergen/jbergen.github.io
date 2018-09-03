import React from 'react';
import { Link } from 'react-router-dom'

export default props => {
    const { post, media, router } = props;
    const listThumb = (() => {
        if (media) {
            const imgURL = require(`../media/${media.filename}`)
            const style = { backgroundImage: `url(${imgURL})` };
            return <div className='list-thumb' style={style}/>;
        }
        return null
    })();

    return (
        <li className='col-sm-6'>
            <Link to={`${router.match.path}/${post.slug}`}>
                {listThumb}
                {post.name}
            </Link>
        </li>
    );
};
