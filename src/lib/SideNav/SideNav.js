import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

class SideNav extends Component {

    state = {
        open: false,
    }

    render() {
        const { children, } = this.props;

        return (
            <nav>
                <List component="ul">
                    {children}
                </List>
            </nav>
        );
    }
}

SideNav.propTypes = {
    children: PropTypes.element.isRequired
};

export default SideNav;