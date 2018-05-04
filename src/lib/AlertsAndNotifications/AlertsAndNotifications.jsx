import React from 'react';
import PropTypes from 'prop-types';


const styles = {
    notificationList:{
        padding: '6px 20px 24px 37px',
    },
    listItem:{
        borderBottom: '1px solid #eaeaea',
        padding: '11px 0',
        position: 'relative',
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
};

const AlertsAndNotifications  = ({notifications, title, showTitle}) => {
    return(
        <ul style={styles.notificationList}>
            {notifications.map((notification, ind)=>
                (<li key={ind} style={styles.listItem}>
                    <p style={styles.alert}>{notification.text}</p>
                    <span style={styles.alertTime}>{notification.time}</span>
                </li>)
            )}
        </ul>
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

export default AlertsAndNotifications;