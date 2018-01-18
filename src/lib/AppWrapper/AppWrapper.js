import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Reboot from 'material-ui/Reboot';
import { withStyles } from 'material-ui/styles';

import theme from '../Theme';
import AppFrame from '../AppFrame';

const styles = theme => ({
    medium: {
        fontWeight: 500
    }
})

class AppWrapper extends Component {
    render() {
        const { children, classes } = this.props;

        const drawerTitle = (
            <span>
                <span className={classes.medium}>IRIS</span> Dev Portal
            </span>
        )

        return (
            <MuiThemeProvider theme={theme}>
                    <Reboot />
                    <AppFrame
                        title="Acme Application"
                        content={null}
                        drawerTitle={drawerTitle}
                        drawerContent={null}
                    >{children}</AppFrame>
                </MuiThemeProvider>
                )
    }
}

export default withStyles(styles)(AppWrapper);