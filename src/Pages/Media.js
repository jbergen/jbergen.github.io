import React from 'react';
import { Link } from 'react-router-dom'

export default props => {
    const { media, data } = props;
    const imgURL = require(`../media/${ media.filename }`)
    const img = <img key={ imgURL } src={ imgURL } alt={ imgURL }/>

    const gridMedia = data.media.filter(media => {
        return media.include_in_feed_grid;
    });

    const mediaIndex = (() => {
        for (var i = 0; i < gridMedia.length; i++) {
            let m = gridMedia[i];
            if (m.id === media.id) {
                return i;
            }
        }
        return -1;
    })();

    const backLink = (() => {
        const newIndex = (mediaIndex - 1 + gridMedia.length) % gridMedia.length;
        const m = gridMedia[newIndex];
        return (
            <Link to={`/media/${m.id}`}>back</Link>
        )
    })();

    const nextLink = (() => {
        const newIndex = (mediaIndex + 1) % gridMedia.length;
        const m = gridMedia[newIndex];
        return (
            <Link to={`/media/${m.id}`}>next</Link>
        )
    })();

    return (
        <div className='post-wrapper width-constrained'>
            <div>
                {img}
            </div>
            <div>
                <i>{ media.title }</i>, {media.media}, {media.year}
                <br/>
                {media.dimension}
            </div>
            <div>
                {backLink} / {nextLink}
            </div>
        </div>
    );
};
