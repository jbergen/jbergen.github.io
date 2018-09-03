import React from 'react';
import { Link } from 'react-router-dom'

export default props => {
    const { media, data } = props;
    const imgURL = require(`../media/${ media.filename }`)
    const img = <img key={ imgURL } src={ imgURL } alt={ imgURL }/>
    const homePage = data.pages.find(p => p.name === 'home');

    const gridMedia = [];
    homePage.media.forEach(mediaId => {
        let media = data.media.find(m => mediaId === m.id);
        if (media) {
            gridMedia.push(media);
        } else {
            console.log("COULD NOT FIND MEDIA FOR GRID:", mediaId)
        }
    })

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
