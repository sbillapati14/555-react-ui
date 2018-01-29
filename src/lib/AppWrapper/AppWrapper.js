import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Reboot from 'material-ui/Reboot';
import { withStyles } from 'material-ui/styles';

import theme from '../Theme';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '100vh',
        width: '100%',
    },
})

class AppWrapper extends Component {

    state = {
        isMobileOpen: false,
    };

    toggleDrawer = () => {
        this.setState({ isMobileOpen: !this.state.isMobileOpen });
    };

    render() {
        const { render, classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <Reboot />
                <div className={classes.root}>
                    {render({ isMobileOpen: this.state.isMobileOpen, toggleDrawer: this.toggleDrawer })}
                </div>
            </MuiThemeProvider>
        )
    }
}

AppWrapper.propTypes = {
    render: PropTypes.func.isRequired
}

export default withStyles(styles)(AppWrapper);