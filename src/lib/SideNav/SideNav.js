import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';

const styles = theme => ({
    root: {
        padding: 0
    }
})

class SideNav extends Component {

    state = {
        open: false,
    }

    render() {
        const { children, classes } = this.props;

        return (
            <List component="ul" classes={{ root: classes.root }}>
                {children}
            </List>
        );
    }
}

SideNav.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(SideNav);