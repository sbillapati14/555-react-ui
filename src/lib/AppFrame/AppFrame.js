import React, { Component } from 'react';
import withStyles from "material-ui/styles/withStyles";

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '100vh',
        width: '100%',
    },
});

class AppFrame extends Component {

    render() {
        const { children, classes } = this.props;

        return (
            <div className={classes.root}>
                {children}
            </div>
        )
    }
}

export default withStyles(styles)(AppFrame);