import React from 'react';

export default props => {
    const { media } = props;
    const imgURL = require(`../media/${ media.filename }`)
    const img = <img key={ imgURL } src={ imgURL } alt={ imgURL }/>
    console.log(props)
    return (
        <div className='post-wrapper width-constrained'>
            <div>
                {img}
            </div>
            <i>{ media.title }</i>, {media.media}, {media.year}
            <br/>
            {media.dimension}
        </div>
    );
};
