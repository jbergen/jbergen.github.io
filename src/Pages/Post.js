import React from 'react';
import Markdown from 'react-markdown';

export default props => {
    const images = props.media.map(media => {
        const imgURL = require(`../media/${ media.filename }`)
        return <img key={ imgURL } src={ imgURL } alt={ imgURL }/>
    });

    return (
        <div>
            { images.length > 0 && images }
            <Markdown source={ props.data.body }/>
        </div>
    );
};
