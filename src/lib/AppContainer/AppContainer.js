import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Reboot from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import theme from '../Theme';

const styles = theme => ({
    portalPage: {
        height: '100%',
        width: '100%',
        scrollBehavior: 'smooth',
        '& > body': {
            minHeight: '100%',
            position: 'relative',
            backgroundColor: '#FFF',
            lineHeight: 1,
            fontFamily: theme.typography.fontFamily
        }
    }
})

class AppContainer extends Component {

    componentDidMount() {
        document.getElementsByTagName('html')[0].className = this.props.classes.portalPage;
    }

    render() {
        const { children } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <Reboot />
                {children}
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(AppContainer);