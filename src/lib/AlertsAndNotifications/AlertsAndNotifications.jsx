import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Dot from '@material-ui/icons/Brightness1'


const styles = theme => {
    return {
        notificationList:{
            padding: '0px 20px 10px 27px',
            margin: '0',
        },
        listItem:{
            padding: '0',
        },
        alert:{
            color: '#5e5e5e',
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
            lineHeight: '19px',
            width: '80%',
            display: 'inline'
        },
        circle: {
            width: 5,
            height: 5,
            position: 'relative',
            left: '-14px',
        },
        alertTime:{
            color: '#a5a5a5',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '14px',
            fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
            position: 'absolute',
            right: '0',
            display: 'inline',
            paddingLeft: '10px',
            width: '20%'
        }
    }
    };

const AlertsAndNotifications  = ({notifications, title, showTitle, classes}) => {
    return (
      <List className={classes.notificationList}>
        {notifications.map((notification, ind)=>
          (<div key={ind}>
              <ListItem key={ind} id={`notificationItem-${ind}`} className={classes.listItem}>
                  <Dot style={{ color:  "#000"}} className={classes.circle} />
                  <p className={classes.alert}>{notification.description}</p>
            <span className={classes.alertTime}>{timeAgo(notification.timestamp)}</span>
          </ListItem>
          {(ind < notifications.length-1) && <Divider />}
        </div>)
        )}
      </List>
    )
}

AlertsAndNotifications.propTypes = {
    notification : PropTypes.array
}

AlertsAndNotifications.defaultProps = {
    notifications: [
        {id:1, description:'Acme Application has a poor Platform health.', timestamp:1526235491524},
        {id:2, description:'Lorem Application has been deployed', timestamp:1526236158569},
        {id:3, description:'Acme Application has a poor Platform health.', timestamp:1526236194698},
        {id:4, description:'Lorem Application has been deployed', timestamp:1526236214756}
    ]
}

export default withStyles(styles)(AlertsAndNotifications);



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
