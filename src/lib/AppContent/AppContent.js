import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    rightContent: {
        padding: '0 0 0 266px',
        background: '#fff',
    },
    '@media (max-width: 1024px)': {
        rightContent: {
            padding: 0,
            transform: 'translateX(0)',
            transition: 'all .5s',
        },
        isMobileOpen: {
            position: 'fixed',
            width: '100%',
            transform: 'translateX(-300px)',
        }
    }
});

class AppContent extends Component {

    getRootClass() {
        const { classes, isMobileOpen } = this.props;

        if (isMobileOpen)
            return `${classes.rightContent} ${classes.isMobileOpen}`;

        return classes.rightContent;

    }

    render() {
        const { children } = this.props;

        return (
            <div className={this.getRootClass()}>
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