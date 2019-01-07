import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import './MyApps.css';
import AccentButton from '../Button/AccentButton';


const styles = theme => {
    return {
        appList:{
            padding: '0px 20px 10px 27px',
            margin: '0',
        },
        listItem:{
            padding: '-5px',
        },
        update:{
            color: '#5e5e5e',
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
            lineHeight:'19px',
            width:'80%',
            display: 'right'
        },
        lastUpdate:{
            color: '#a5a5a5',
            fontSize: '17px',
            fontWeight: '400',
            LineHeight: '14px',
            fontFamily:'"Montserrat", "Helvetica", "Arial", sans-serif',
            right: '0',
            display: 'inLine',
            paddingLeft: '10px',
            width: '20%'
        },
        button_list:{
            float: 'right',
            width: '100px'
        },
        AccentButton:{
            display: 'inline',
            margin: 'theme.spacing.unit'
        },
        GradientButton:{
            display: 'inline'
        }
    }
};

const MyApps = ({applications, title, showTitle, classes}) => {
    return(
            <List className = {classes.appList}>
            {applications.map((application, ind)=>
                (<div key={ind}>
                     <ListItem key={ind} className = {classes.listItem}>
                         <p className = {classes.lastUpdate}>{application.description}</p>
                 <div>
                    <AccentButton>PingID</AccentButton>
                    <AccentButton>SSO Auth</AccentButton></div>
                <p>
                    <AccentButton>Token Exchange Auth</AccentButton> 
                    <AccentButton>Tokens</AccentButton>
                 </p>
                 {/*<span className={classes.lastUpdate}>{timeAgo(application.timestamp)}</span>*/}
                 {/*<p id= "button_list">
                 <ul>
                     <li>
                        <AccentButton>PingID</AccentButton>
                     </li>
                     <li>
                        <AccentButton>SSO Auth</AccentButton>
                     </li>
                     <li>
                        <AccentButton>Token Exchange Auth</AccentButton> 
                     </li>
                     <li>
                        <GradientButton>Tokens</GradientButton>
                     </li>
                 </ul>
                </p>*/}
            </ListItem>
            <div class="inner"></div>
            {(ind < applications.length-1) && <Divider />}
        </div>)
        )}
        </List>
    )
}

MyApps.propTypes = {
    application : PropTypes.array
}

MyApps.defaultProps = {
    applications: [
        {id:1, description:'Acme', timestamp:1526235491524},
        {id:2, description:'Lorem', timestamp:1526236158569}
    ]
}

export default withStyles(styles)(MyApps);

function timeAgo(timestamp) {

    var current = Date.now();
    var previous = timestamp;

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' sec ago';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' min ago';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';
    }
}