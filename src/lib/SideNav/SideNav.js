import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';


const styles = theme => ({
    root: {
        marginTop: '65px',
    }
});

class SideNav extends Component {

    state = {
        open: false,
    }

    render() {
        const { classes, children, } = this.props;

        return (
            <nav>
                <List className={classes.root} component="ul">
                    {children}
                </List>
            </nav>
        );
    }
}

SideNav.propTypes = {
    children: PropTypes.element.isRequired
};

export default withStyles(styles)(SideNav);