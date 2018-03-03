import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Reboot from 'material-ui/Reboot';
import { withStyles } from 'material-ui/styles';

import theme from '../Theme';

const styles = theme => ({
    portalPage: {
        height: '100%',
        width: '100%',
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