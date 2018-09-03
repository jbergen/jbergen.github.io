import React, { Component } from 'react';
import Post from './Post';
import ModularPage from './ModularPage';
import pageView from './../pageView';
import { Route, Switch } from 'react-router-dom'
import './Page.css';

export default class Page extends Component {
    renderPostList = router => {
        const { page, data } = this.props;
        pageView(page.name, router.location.pathname);
        return <ModularPage page={page} data={data} router={router}/>;
    }

    renderPostPage = router => {
        const { data } = this.props;
        const post = data.posts.find(post => post.slug === router.match.params.slug)
        pageView(post.name, router.location.pathname);
        return (
            <Post post={post} data={this.props.data}/>
        );
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route
                        exact
                        path={this.props.router.match.path}
                        render={this.renderPostList}
                    />
                    <Route
                        path={`${this.props.router.match.path}/:slug`}
                        render={this.renderPostPage}
                    />
                </Switch>
            </div>
        );
    }
}
