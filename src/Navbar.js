import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        const navItems = this.props.pages.map(page => {
            if (page.hide_in_nav) { return null; }
            
            let title = '';
            let slug = '/';
            let exact = false;

            if (page.name === 'home') {
                title = this.props.siteTitle;
                exact = true;
            } else {
                title = page.name;
                slug = `/${ page.name }`;
            }

            return (
                <li key={slug}>
                    <NavLink
                        exact={exact}
                        to={slug}
                        activeClassName='selected'
                    >
                        {title}
                    </NavLink>
                </li>
            );
        });

        return (
            <header className='navtabbar'>
                <ul>
                    {navItems}
                    <li className='end-tab'>&nbsp;</li>
                </ul>
            </header>
        );
    }
}