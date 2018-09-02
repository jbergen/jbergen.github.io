import React from 'react';
import Markdown from 'react-markdown';

export default props => {
    const images = props.media.map(media => {
        const imgURL = require(`../media/${ media.filename }`)
        return <img key={ imgURL } src={ imgURL } alt={ imgURL }/>
    });

    return (
        <div className='post-wrapper width-constrained'>
            <h4>{ props.data.name }</h4>
            { images.length > 0 && images }
            <Markdown source={ props.data.body }/>
        </div>
    );
};
