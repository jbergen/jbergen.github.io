import React from 'react';
import Markdown from 'react-markdown';
import PostListItem from '../Posts/PostListItem';
import './Page.css';

export default props => {
    const images = props.data.media ? props.data.media.map(media => {
        const imgURL = require(`../media/${ media }`)
        return <img key={ imgURL } src={ imgURL }/>
    }) : [];

    const posts = props.posts ? props.posts.map(post => {
        if (post.visible) {
            return <PostListItem key={ post.slug } post={ post }/>;
        } else {
            return null;
        }
    }) : [];

    return (
        <div>
            { images.length > 0 && images }
            <Markdown source={ props.data.body }/>
            { posts.length > 0 && <ul>{ posts }</ul>}
        </div>
    );
};
