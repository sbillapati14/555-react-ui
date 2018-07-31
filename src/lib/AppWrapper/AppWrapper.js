import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    appWrapper: {}
})

class AppWrapper extends Component {

    state = {
        isMobileOpen: false,
    };

    toggleDrawer = () => {
        console.log('toggleDrawer', !this.state.isMobileOpen)
        this.setState({ isMobileOpen: !this.state.isMobileOpen });
    };

    render() {
        const { render, classes } = this.props;

        return (
            <div className={classes.appWrapper}>
                {render({ isMobileOpen: this.state.isMobileOpen, toggleDrawer: this.toggleDrawer })}
            </div>
        )
    }
}

AppWrapper.propTypes = {
    render: PropTypes.func.isRequired
}

export default withStyles(styles)(AppWrapper);