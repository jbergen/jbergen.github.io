import React, { Component } from 'react';
import Markdown from 'react-markdown';
import PostListItem from '../Posts/PostListItem';
import { Link } from 'react-router-dom'
import './Page.css';

export default class ModularPage extends Component {
    pageMedia = (page, data) => {
        if (!page.media) { return []; }
        const pageMedia = [];
        page.media.forEach(mediaId => {
            let m = data.media.find(media => media.id === mediaId)
            if (m) {
                pageMedia.push(m);
            } else {
                console.log("MISSING MEDIA FOR MODULAR PAGE:", mediaId);
            }
        });
        return pageMedia
    }

    pageImages = (page, data) => {
        const pageMedia = this.pageMedia(page, data);
        
        return pageMedia.map(media => {
            const imgURL = require(`../media/${ media.filename }`)
            return <img key={ imgURL } src={ imgURL } alt={ imgURL }/>
        });
    }

    gridItems = (page, data, router) => {
        if (!page.has_media_grid) { return []; }
        const pageMedia = this.pageMedia(page, data);

        return pageMedia.map(media => {
            const imgURL = require(`../media/${media.filename}`)
            return (
                <li key={media.id}>
                    <Link to={`${router.match.path}media/${media.id}`}>
                        <img src={imgURL} alt={imgURL}/>
                    </Link>
                </li>
            );
        });
    }

    posts = (page, data, router) => {
        const childPosts = data[page.has_posts_of_type] || [];
        return childPosts.map(post => {
            if (post.visible && post.media) {
                const postThumb = post.media ?
                    data.media.find(media => media.id === post.media[0]) :
                    null;

                return (
                    <PostListItem
                        key={post.slug}
                        post={post}
                        media={postThumb}
                        router={router}
                    />
                );
            } else {
                return null;
            }
        });
    }

    render = () => {
        const { page, data, router } = this.props;
        const images = this.pageImages(page, data);
        const childPosts = this.posts(page, data, router);
        const gridItems = this.gridItems(page, data, router);
        const showImageList = !gridItems.length

        return (
            <div>
                {showImageList &&
                    <div className='width-constrained'>
                        { images.length > 0 && images }
                    </div>
                }
                <Markdown
                    className='width-constrained'
                    source={page.body}
                />
                {gridItems.length > 0 &&
                    <ul className='media-grid'>
                        {gridItems}
                    </ul>
                }
                {childPosts.length > 0 &&
                    <ul className='post-list width-constrained'>
                        {childPosts}
                    </ul>
                }
            </div>
        );
    }
}
