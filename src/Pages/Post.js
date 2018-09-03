import React from 'react';
import Markdown from 'react-markdown';

export default props => {
    const { post, data } = props;
    const postMedia = post.media ? post.media.map(mediaId => {
        return data.media.find(media => media.id === mediaId);
    }): [];

    const images = postMedia.map(media => {
        const imgURL = require(`../media/${ media.filename }`)
        return <img key={ imgURL } src={ imgURL } alt={ imgURL }/>
    });

    return (
        <div className='post-wrapper width-constrained'>
            <h4>{ post.name }</h4>
            { images.length > 0 && images }
            <Markdown source={ props.post.body }/>
        </div>
    );
};
