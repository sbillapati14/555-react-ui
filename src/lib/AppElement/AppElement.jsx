import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import AuthTypesSSO from '../AuthTypes/Sso.jsx';
import AuthTypesTokenExchange from '../AuthTypes/TokenExchange.jsx';
import AuthTypesPingId from '../AuthTypes/PingID.jsx';


function TabContainer(props) {
    return (
        <Typography component="div" style = {{ padding : 8 * 4}}>
            {props.children}
        </Typography>
    );

}

TabContainer.propTypes = {
    children : PropTypes.node.isRequired,
};

const styles = theme => ({
    root : {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    eachTab : {
        color : '#1682bc',
    }
});

class AppElement extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render(){
        const { classes } = this.props;
        const { value } = this.state;
        

        return(
            <div className = {classes.root}>
                <AppBar position="static" color="#ffffff">
                    <Tabs value = {this.state.value} onChange={this.handleChange} scrollable scrollButtons="on">
                        <Tab className = {classes.eachTab} label= "PingID"/>
                        <Tab className = {classes.eachTab} label = "Token Exchange Auth" />
                        <Tab className = {classes.eachTab} label = "SSO Auth Settings"  />
                        <Tab className = {classes.eachTab} label = "Tokens"  />
                        <Tab className = {classes.eachTab} label = "Notifications" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer><AuthTypesPingId /></TabContainer>}
                {value === 1 && <TabContainer><AuthTypesTokenExchange /></TabContainer>}
                {value === 2 && <TabContainer><AuthTypesSSO /></TabContainer>}
                {value === 3 && <TabContainer>Tokens</TabContainer>}
                {value === 4 && <TabContainer>Notifications</TabContainer>}
            </div>
        );
    }
}

AppElement.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppElement);