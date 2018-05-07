import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Dot from 'material-ui-icons/Brightness1'


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
            paddingRight: '50px',
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
            top: '16px',
            display: 'inline'
        }
    }
    };

const AlertsAndNotifications  = ({notifications, title, showTitle, classes}) => {
    return(
                <List className={classes.notificationList}>
                {notifications.map((notification, ind)=>
                  (<div>
                      <ListItem key={ind} className={classes.listItem}>
                          <Dot style={{ color:  "#000"}} className={classes.circle} />
                          <p className={classes.alert}>{notification.text}</p>
                    <span className={classes.alertTime}>{notification.time}</span>
                  </ListItem>
                  {(ind < notifications.length-1) && <Divider />}
                </div>)
                )}
                </List>
    )
}

AlertsAndNotifications.propTypes = {
    notification : PropTypes.array.isRequired
}

AlertsAndNotifications.defaultProps = {
    notifications: [
        {text:'Acme Application has a poor Platform health.', time:'5m ago', isSeen: true},
        {text:'Lorem Application has been deployed', time:'5m ago', isSeen: false},
        {text:'Acme Application has a poor Platform health.', time:'7m ago', isSeen: false},
        {text:'Lorem Application has been deployed', time:'10m ago', isSeen: true}
    ]
}

export default withStyles(styles)(AlertsAndNotifications);