import React from 'react';
import Markdown from 'react-markdown';
import PostListItem from '../Posts/PostListItem';
import Post from './Post';
import { Route, Switch } from 'react-router-dom'
import './Page.css';

export default props => {
    const images = props.media.map(media => {
        const imgURL = require(`../media/${ media.filename }`)
        return <img key={ imgURL } src={ imgURL } alt={ imgURL }/>
    });

    const postList = router => {
        const posts = props.posts ? props.posts.map(post => {
            if (post.visible) {
                return <PostListItem key={ post.slug } post={ post } router={ router }/>;
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
    }

    const postPage = router => {
        const post = props.posts.find(post => post.slug == router.match.params.slug)
        const postMedia = post.media ? post.media.map(mediaId => {
            return props.allMedia.find(media => media.id === mediaId);
        }): [];

        return (
            <Post
                data={ post }
                media={ postMedia }
            />
        );
    };

    return (
        <div>
            <Switch>
                <Route exact path={ props.router.match.path } component={ postList }/>
                <Route path={ `${props.router.match.path}/:slug` } component={ postPage }/>
            </Switch>
        </div>
    );
};
