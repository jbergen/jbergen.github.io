import React, { Component } from 'react';
import Markdown from 'react-markdown';
import PostListItem from '../Posts/PostListItem';
import Post from './Post';
import { Route, Switch } from 'react-router-dom'
import './Page.css';

export default class Page extends Component {
    renderPostList = router => {
        const images = this.props.media.map(media => {
            const imgURL = require(`../media/${ media.filename }`)
            return <img key={ imgURL } src={ imgURL } alt={ imgURL }/>
        });
        
        const posts = this.props.posts ? this.props.posts.map(post => {
            if (post.visible && post.media) {
                const postThumb = post.media ?
                this.props.allMedia.find(media => media.id === post.media[0]) :
                    null;

                return (
                    <PostListItem
                        key={ post.slug }
                        post={ post }
                        media={ postThumb }
                        router={ router }
                    />
                );
            } else {
                return null;
            }
        }) : [];

        const gridItems = this.props.gridMedia.map(media => {
            const imgURL = require(`../media/${ media.filename }`)
            return (
                <li key={media.id}>
                    <img src={imgURL} alt={imgURL}/>
                </li>
            );
        });

        return (
            <div>
                <div className='width-constrained'>
                    { images.length > 0 && images }
                </div>
                <Markdown
                    className='width-constrained'
                    source={this.props.data.body}
                />
                {gridItems.length > 0 &&
                    <ul className='media-grid'>
                        {gridItems}
                    </ul>
                }
                {posts.length > 0 &&
                    <ul className='post-list width-constrained'>{ posts }</ul>
                }
            </div>
        );
    }

    renderPostPage = router => {
        const post = this.props.posts.find(post => post.slug === router.match.params.slug)
        const postMedia = post.media ? post.media.map(mediaId => {
            return this.props.allMedia.find(media => media.id === mediaId);
        }): [];

        document.title = `Joseph Bergen - ${ post.name }`;
        if (window.ga) {
            window.ga('set', 'page', this.props.router.location.pathname);
            window.ga('send', 'pageview');
        }

        return (
            <Post
                data={ post }
                media={ postMedia }
            />
        );
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route
                        exact path={this.props.router.match.path}
                        component={this.renderPostList}
                    />
                    <Route
                        path={`${this.props.router.match.path}/:slug`}
                        component={this.renderPostPage}
                    />
                </Switch>
            </div>
        );
    }
}
