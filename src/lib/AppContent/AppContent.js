import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from "material-ui/styles/withStyles";

const styles = theme => ({
    appContent: {
        transition: theme.transitions.create('margin-left'),
        [theme.breakpoints.up('lg')]: {
            width: 'calc(100% - 266px)',
        },
        ...theme.mixins.gutters({
            paddingTop: 80,
            flex: 'auto',
            maxWidth: '100%',
            margin: '0 auto',
        })
    },
    appContentMobile: {
        marginLeft: '-266px',
        [theme.breakpoints.up('lg')]: {
            marginLeft: 0,
        },
    }
});

class AppContent extends Component {

    render() {
        const { children, classes, isMobileOpen } = this.props;

        let appContentClassName = classes.appContent;
        if (isMobileOpen)
            appContentClassName += ` ${classes.appContentMobile}`;


        return (
            <div className={appContentClassName}>
                {children}
            </div>
        )
    }
}


AppContent.propTypes = {
    isMobileOpen: PropTypes.bool,
}

AppContent.propDefaults = {
    isMobileOpen: false,
}

export default withStyles(styles)(AppContent);