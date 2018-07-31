import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    appPage: {
        position: 'relative',
        padding: '30px 29px 24px 31px',
    },
    '@media (max-width: 767px)': {
        appPage: {
            padding: '15px 13px 27px 13px'
        },
    }
});

class AppPage extends Component {

    render() {
        const { children, classes } = this.props;

        return (
            <div className={classes.appPage}>
                {children}
            </div>
        )
    }
}


AppPage.propTypes = {
    isMobileOpen: PropTypes.bool,
}

AppPage.propDefaults = {
    isMobileOpen: false,
}

export default withStyles(styles)(AppPage);